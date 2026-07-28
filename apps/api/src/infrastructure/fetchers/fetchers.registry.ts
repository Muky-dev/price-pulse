import { Injectable } from '@nestjs/common';
import { HttpFetcherService } from './http-fetcher.service';
import { PlaywrightFetcherService } from './playwright-fetcher.service';

@Injectable()
export class FetchersRegistry {
  constructor(
    private readonly httpFetcher: HttpFetcherService,
    private readonly playwrightFetcher: PlaywrightFetcherService,
  ) {}

  getAll() {
    return [this.httpFetcher, this.playwrightFetcher];
  }
}
