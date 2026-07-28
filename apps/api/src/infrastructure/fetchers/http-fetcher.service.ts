import { Logger } from '@nestjs/common';
import { HtmlFetcher } from './interfaces/html-fetcher';

export class HttpFetcherService implements HtmlFetcher {
  async fetchHtml(url: string): Promise<string> {
    const response = await fetch(url);

    if (!response.ok) {
      Logger.error(
        `Failed to fetch HTML for URL: ${url}, Status: ${response.status}`,
      );
    }

    return await response.text();
  }
}
