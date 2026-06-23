import { Module } from '@nestjs/common';
import { ScrapeOfferService } from './scrape-offer.service';
import { BullModule } from '@nestjs/bullmq';
import { ScrapingProcessor } from './scraping.processor';
import { QUEUES } from 'src/infrastructure/queue/queues';
import { PrismaService } from 'src/prisma.service';
import { PlaywrightModule } from 'src/infrastructure/playwright/playwright.module';
import { StrategyRegistry } from './strategy.registry';
import { ScrapeRunsModule } from '../scrape-runs/scrape-runs.module';
import { PricePointsModule } from '../price-points/price-points.module';
import { JsonLdStrategy } from './strategies/json-ld.strategy';
import { MicrodataStrategy } from './strategies/microdata.strategy';
import { OpenGraphStrategy } from './strategies/open-graph.strategy';
import { ProductsModule } from '../products/products.module';
import { OffersModule } from '../offers/offers.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES.SCRAPE,
    }),
    PlaywrightModule,
    ScrapeRunsModule,
    PricePointsModule,
    ProductsModule,
    OffersModule,
  ],
  providers: [
    ScrapeOfferService,
    ScrapingProcessor,
    PrismaService,
    StrategyRegistry,
    JsonLdStrategy,
    MicrodataStrategy,
    OpenGraphStrategy,
  ],
})
export class ScrapingModule {}
