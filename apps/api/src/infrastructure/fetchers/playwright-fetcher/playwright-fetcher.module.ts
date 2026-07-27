import { Module } from '@nestjs/common';
import { PlaywrightFetcherService } from './playwright-fetcher.service';
import { BrowserModule } from '../../browser/browser.module';

@Module({
  imports: [BrowserModule],
  providers: [PlaywrightFetcherService],
  exports: [PlaywrightFetcherService],
})
export class PlaywrightFetcherModule {}
