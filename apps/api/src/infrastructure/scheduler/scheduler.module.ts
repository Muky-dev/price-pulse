import { Module } from '@nestjs/common';
import { OfferScrapeScheduler } from './offer-scrape.scheduler';

@Module({
  providers: [OfferScrapeScheduler],
})
export class SchedulerModule {}
