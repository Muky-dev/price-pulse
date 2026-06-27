import { Injectable, Logger } from '@nestjs/common';
import { PlaywrightService } from 'src/infrastructure/playwright/playwright.service';
import { OfferJobPayload } from 'src/infrastructure/queue/types/offer-job.type';
import { StrategyRegistry } from './strategy.registry';
import { ExtractionResult } from './interfaces/extraction-result';
import { ScrapeRunsService } from '../scrape-runs/scrape-runs.service';
import { PricePointsService } from '../price-points/price-points.service';
import { OffersService } from '../offers/offers.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ScrapeOfferService {
  constructor(
    private readonly scrapeRunsService: ScrapeRunsService,
    private readonly pricePointsService: PricePointsService,
    private readonly offersService: OffersService,
    private readonly productsService: ProductsService,
    private readonly playwrightService: PlaywrightService,
    private readonly strategyRegistry: StrategyRegistry,
  ) {}

  async execute(data: OfferJobPayload) {
    const { offerId, url } = data;

    const scrapeRun = await this.scrapeRunsService.create({
      offerId,
      startedAt: new Date(),
    });

    const html = await this.playwrightService.fetchHtml(url);

    let extraction: ExtractionResult = {
      productName: undefined,
      productBrand: undefined,
      price: undefined,
      storeName: undefined,
      currency: undefined,
    };

    for (const strategy of this.strategyRegistry.getAll()) {
      if (!strategy.canHandle(html)) continue;

      const result: ExtractionResult = strategy.extract(html);

      extraction = this.mergeExtractionResults(extraction, result);
      break;
    }

    if (!this.isExtractionComplete(extraction)) {
      Logger.warn(
        `Extraction result may be incomplete for offerId: ${offerId}, url: ${url}`,
        'ScrapeOfferService',
      );
    }

    await this.scrapeRunsService.update(scrapeRun.id, {
      finishedAt: new Date(),
    });

    const offer = await this.offersService.findOneWithProduct(offerId);

    if (!offer?.productId) {
      if (extraction.productName) {
        await this.productsService.createByScrapeRun({
          name: extraction.productName,
          brand: extraction.productBrand,
          visibility: 'SHARED',
          offerId,
        });
      } else {
        Logger.warn(
          `Product name is undefined for offerId: ${offerId}, url: ${url}`,
          'ScrapeOfferService',
        );
      }
    }

    const pricePointRegistered = await this.registerPricePoint(
      offerId,
      extraction,
    );

    await this.scrapeRunsService.update(scrapeRun.id, {
      success: pricePointRegistered,
    });

    return pricePointRegistered;
  }

  private isExtractionComplete(extraction: ExtractionResult): boolean {
    return !Object.values(extraction).some(
      (value) => value === undefined || value === null,
    );
  }

  private async registerPricePoint(
    offerId: string,
    extraction: ExtractionResult,
  ): Promise<boolean> {
    try {
      if (extraction.price === undefined || extraction.currency === undefined) {
        Logger.warn(
          `Price or currency is undefined for offerId: ${offerId}`,
          'ScrapeOfferService',
        );
        return false;
      }

      await this.pricePointsService.create({
        offerId,
        price: extraction.price,
        currency: extraction.currency,
      });

      return true;
    } catch {
      Logger.error(
        `Failed to register price point for offerId: ${offerId}`,
        'ScrapeOfferService',
      );
      return false;
    }
  }

  private mergeExtractionResults(
    existing: ExtractionResult,
    newResult: ExtractionResult,
  ): ExtractionResult {
    return {
      productName: newResult.productName ?? existing.productName,
      price: newResult.price ?? existing.price,
      storeName: newResult.storeName ?? existing.storeName,
      currency: newResult.currency ?? existing.currency,
    };
  }
}
