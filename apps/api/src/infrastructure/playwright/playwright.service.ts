import { Injectable } from '@nestjs/common';
import { BrowserProvider } from '../browser/browser.provider';

@Injectable()
export class PlaywrightService {
  constructor(private readonly browserProvider: BrowserProvider) {}

  async fetchHtml(url: string) {
    const context = await this.browserProvider.createContext();

    try {
      const page = await context.newPage();

      await page.goto(url, {
        waitUntil: 'domcontentloaded',
      });

      const html = await page.content();

      return html;
    } finally {
      await context.close();
    }
  }
}
