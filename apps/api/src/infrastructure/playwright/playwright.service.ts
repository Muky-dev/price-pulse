import { Injectable, Logger } from '@nestjs/common';
import { BrowserProvider } from '../browser/browser.provider';

@Injectable()
export class PlaywrightService {
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
          `Failed to fetch HTML for URL: ${url}, Status: ${response.status()}`,
        );
      }

      const html = await page.content();

      return html;
    } finally {
      await context.close();
    }
  }
}
