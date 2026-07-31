import { Module } from '@nestjs/common';
import { ScrapeOfferScheduler } from './offer-scrape.scheduler';

@Module({
  providers: [ScrapeOfferScheduler],
})
export class SchedulerModule {}
