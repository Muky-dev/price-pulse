import { Module } from '@nestjs/common';
import { PlaywrightFetcherService } from './playwright-fetcher.service';
import { BrowserModule } from '../browser/browser.module';
import { FetchersRegistry } from './fetchers.registry';
import { HttpFetcherService } from './http-fetcher.service';

@Module({
  imports: [BrowserModule],
  providers: [PlaywrightFetcherService, HttpFetcherService, FetchersRegistry],
  exports: [FetchersRegistry],
})
export class FetchersModule {}
