import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { ExtractStrategy } from '../interfaces/extract-strategy';
import { ExtractionResult } from '../interfaces/extraction-result';

@Injectable()
export class MicrodataStrategy implements ExtractStrategy {
  readonly name: string = 'microdata';

  canHandle(html: string): boolean {
    return html.includes('itemtype') && html.includes('itemprop');
  }

  extract(html: string): ExtractionResult {
    const $ = cheerio.load(html);
    return {
      productTitle: $('[itemprop=name]').first().attr('content'),
      price: $('[itemprop=price]').first().attr('content')
        ? Number($('[itemprop=price]').first().attr('content'))
        : undefined,
      storeName: $('[itemprop=brand]').first().attr('content'),
      currency: $('[itemprop=priceCurrency]').first().attr('content'),
    };
  }
}
