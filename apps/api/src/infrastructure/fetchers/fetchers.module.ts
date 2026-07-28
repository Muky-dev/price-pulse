import { Module } from '@nestjs/common';
import { PlaywrightFetcherService } from './playwright-fetcher.service';
import { BrowserModule } from '../browser/browser.module';
import { FetchersRegistry } from './fetchers.registry';

@Module({
  imports: [BrowserModule],
  providers: [PlaywrightFetcherService, FetchersRegistry],
  exports: [FetchersRegistry],
})
export class FetchersModule {}
