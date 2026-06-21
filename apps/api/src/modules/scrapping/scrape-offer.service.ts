import { Injectable } from '@nestjs/common';
import { ScrapeRunRepository } from './scrape-run.repository';
import { CreateScrapeRunDto } from './dto/create-scrape-run.dto';
import { PlaywrightService } from 'src/infrastructure/playwright/playwright.service';
import { OfferJobPayload } from 'src/infrastructure/queue/types/offer-job.type';
import { StrategyRegistry } from './strategy.registry';
import { ExtractionResult } from './interfaces/extraction-result';

@Injectable()
export class ScrapeOfferService {
  constructor(
    private readonly scrapeRunRepository: ScrapeRunRepository,
    private readonly playwrightService: PlaywrightService,
    private readonly strategyRegistry: StrategyRegistry,
  ) {}

  createRun(data: CreateScrapeRunDto) {
    const { offerId, ...rest } = data;
    return this.scrapeRunRepository.create({
      ...rest,
      success: false,
      offer: { connect: { id: offerId } },
    });
  }

  async execute(data: OfferJobPayload) {
    const { offerId, url } = data;

    await this.createRun({
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
