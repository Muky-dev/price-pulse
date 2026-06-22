import { Module } from '@nestjs/common';
import { ScrapeOfferService } from './scrape-offer.service';
import { BullModule } from '@nestjs/bullmq';
import { ScrapingProcessor } from './scraping.processor';
import { QUEUES } from 'src/infrastructure/queue/queues';
import { PrismaService } from 'src/prisma.service';
import { PlaywrightModule } from 'src/infrastructure/playwright/playwright.module';
import { StrategyRegistry } from './strategy.registry';
import { ScrapeRunsModule } from '../scrape-runs/scrape-runs.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES.SCRAPE,
    }),
    PlaywrightModule,
    ScrapeRunsModule,
  ],
  providers: [
    ScrapeOfferService,
    ScrapingProcessor,
    PrismaService,
    StrategyRegistry,
  ],
})
export class ScrapingModule {}
