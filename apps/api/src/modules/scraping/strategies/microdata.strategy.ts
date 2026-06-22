import { Injectable } from '@nestjs/common';
import { ExtractStrategy } from '../interfaces/extract-strategy';
import { ExtractionResult } from '../interfaces/extraction-result';

@Injectable()
export class MicrodataStrategy implements ExtractStrategy {
  readonly name: string = 'microdata';

  canHandle(html: string): boolean {
    return html.includes('itemtype') && html.includes('itemprop');
  }

  extract(html: string): ExtractionResult {
    return {
      productTitle: this.pick(html, '[itemprop=name]'),
      price: this.pick(html, '[itemprop=price]'),
    };
  }

  private pick(html: string, selector: string): string {
    // TODO: implement pick logic
    return '';
  }
}
