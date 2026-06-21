import { Module } from '@nestjs/common';
import { ScrapeOfferService } from './scrape-offer.service';
import { BullModule } from '@nestjs/bullmq';
import { ScrappingProcessor } from './scrapping.processor';
import { QUEUES } from 'src/infrastructure/queue/queues';
import { ScrapeRunRepository } from './scrape-run.repository';
import { PrismaService } from 'src/prisma.service';
import { PlaywrightModule } from 'src/infrastructure/playwright/playwright.module';
import { StrategyRegistry } from './strategy.registry';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES.SCRAPE,
    }),
    PlaywrightModule,
  ],
  providers: [
    ScrapeOfferService,
    ScrappingProcessor,
    ScrapeRunRepository,
    PrismaService,
    StrategyRegistry,
  ],
})
export class ScrappingModule {}
