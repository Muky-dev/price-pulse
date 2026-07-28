import { Injectable, Logger } from '@nestjs/common';
import { OfferJobPayload } from 'src/infrastructure/queue/types/offer-job.type';
import { ScrapingStrategyRegistry } from './scraping-strategy.registry';
import { ExtractionResult } from './interfaces/extraction-result';
import { ScrapeRunsService } from '../scrape-runs/scrape-runs.service';
import { PricePointsService } from '../price-points/price-points.service';
import { OffersService } from '../offers/offers.service';
import { ProductsService } from '../products/products.service';
import { FetchersRegistry } from 'src/infrastructure/fetchers/fetchers.registry';

@Injectable()
export class ScrapeOfferService {
  constructor(
    private readonly scrapeRunsService: ScrapeRunsService,
    private readonly pricePointsService: PricePointsService,
    private readonly offersService: OffersService,
    private readonly productsService: ProductsService,
    private readonly fetchersRegistry: FetchersRegistry,
    private readonly strategyRegistry: ScrapingStrategyRegistry,
  ) {}

  async execute(data: OfferJobPayload) {
    const { offerId, url } = data;

    const scrapeRun = await this.scrapeRunsService.create({
      offerId,
      startedAt: new Date(),
    });

    const fetchers = this.fetchersRegistry.getAll();
    const extractionStrategies = this.strategyRegistry.getAll();

    let extraction: ExtractionResult = {
      productName: undefined,
      productBrand: undefined,
      price: undefined,
      storeName: undefined,
      currency: undefined,
    };

    let extractionCompleted = false;

    for (const fetcher of fetchers) {
      const html = await fetcher.fetchHtml(url);

      for (const strategy of extractionStrategies) {
        if (!strategy.canHandle(html)) continue;

        const result: ExtractionResult = strategy.extract(html);

        extraction = this.mergeExtractionResults(extraction, result);
      }

      extractionCompleted = this.isExtractionComplete(extraction);

      if (extractionCompleted) {
        break;
      }
    }

    if (!extractionCompleted) {
      Logger.warn(
        `Extraction incomplete for offerId: ${offerId}, url: ${url}, extraction: ${JSON.stringify(extraction)}`,
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

    const pricePointRegistered =
      await this.pricePointsService.registerPricePointFromExtraction(
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

  private mergeExtractionResults(
    existing: ExtractionResult,
    newResult: ExtractionResult,
  ): ExtractionResult {
    return {
      productName: existing.productName ?? newResult.productName,
      price: existing.price ?? newResult.price,
      storeName: existing.storeName ?? newResult.storeName,
      currency: existing.currency ?? newResult.currency,
      productBrand: existing.productBrand ?? newResult.productBrand,
    };
  }
}
