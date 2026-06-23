import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { ExtractStrategy } from '../interfaces/extract-strategy';
import { ExtractionResult } from '../interfaces/extraction-result';

@Injectable()
export class OpenGraphStrategy implements ExtractStrategy {
  readonly name: string = 'open-graph';

  canHandle(html: string): boolean {
    return html.includes('<meta property="og:');
  }

  extract(html: string): ExtractionResult {
    const $ = cheerio.load(html);

    return {
      productTitle: $('meta[property="og:title"]').attr('content'),
      currency: $('meta[property="product:price:currency"]').attr('content'),
      price: $('meta[property="product:price:amount"]').attr('content')
        ? Number($('meta[property="product:price:amount"]').attr('content'))
        : undefined,
      storeName: $('meta[property="og:site_name"]').attr('content'),
    };
  }
}
