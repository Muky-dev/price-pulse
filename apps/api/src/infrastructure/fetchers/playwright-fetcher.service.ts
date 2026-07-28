import { Injectable, Logger } from '@nestjs/common';
import { BrowserProvider } from '../browser/browser.provider';
import { HtmlFetcher } from './interfaces/html-fetcher';

@Injectable()
export class PlaywrightFetcherService implements HtmlFetcher {
  constructor(private readonly browserProvider: BrowserProvider) {}

  async fetchHtml(url: string) {
    const context = await this.browserProvider.createContext();

    try {
      const page = await context.newPage();

      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
      });

      if (response && response.status() >= 400) {
        Logger.error(
          `Failed to fetch HTML with PlaywrightFetcher for URL: ${url}, Status: ${response.status()}`,
        );
      }

      const html = await page.content();

      return html;
    } finally {
      await context.close();
    }
  }
}
