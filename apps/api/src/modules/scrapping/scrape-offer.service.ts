import { Injectable } from '@nestjs/common';
import { PlaywrightService } from 'src/infrastructure/playwright/playwright.service';
import { OfferJobPayload } from 'src/infrastructure/queue/types/offer-job.type';
import { StrategyRegistry } from './strategy.registry';
import { ExtractionResult } from './interfaces/extraction-result';
import { ScrapeRunsService } from '../scrape-runs/scrape-runs.service';

@Injectable()
export class ScrapeOfferService {
  constructor(
    private readonly scrapeRunsService: ScrapeRunsService,
    private readonly playwrightService: PlaywrightService,
    private readonly strategyRegistry: StrategyRegistry,
  ) {}

  async execute(data: OfferJobPayload) {
    const { offerId, url } = data;

    await this.scrapeRunsService.create({
      offerId,
      strategy: 'placeholder',
      startedAt: new Date(),
    });

    const html = await this.playwrightService.fetchHtml(url);

    for (const strategy of this.strategyRegistry.getAll()) {
      if (strategy.canHandle(html)) {
        const extraction: ExtractionResult = strategy.extract(html);

        if (this.validate(extraction)) break;
      }
    }
  }

  validate(extraction: ExtractionResult): boolean {
    return !Object.values(extraction).some(
      (value) => value === undefined || value === null,
    );
  }
}
