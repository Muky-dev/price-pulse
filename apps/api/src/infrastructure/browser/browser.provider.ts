import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Browser, chromium } from 'playwright';

@Injectable()
export class BrowserProvider implements OnModuleInit, OnModuleDestroy {
  private browser: Browser;

  async onModuleInit() {
    this.browser = await chromium.launch();
  }

  async createContext() {
    return this.browser.newContext();
  }

  async onModuleDestroy() {
    await this.browser.close();
  }
}
