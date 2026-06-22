import { Injectable } from '@nestjs/common';
import { ExtractStrategy } from '../interfaces/extract-strategy';
import { ExtractionResult } from '../interfaces/extraction-result';

@Injectable()
export class JsonLdStrategy implements ExtractStrategy {
  readonly name: string = 'json-ld';

  canHandle(html: string): boolean {
    return html.includes('application/ld+json');
  }

  extract(html: string): ExtractionResult {
    const scripts = this.extractScripts(html);

    const json = scripts.map((s) => JSON.parse(s)).flat();

    const product = json.find((x) => x['@type'] === 'Product');

    return {
      productTitle: product?.name,
      price: product?.offers?.price,
      store: product?.offers?.seller?.name,
      currency: product?.offers?.priceCurrency,
    };
  }

  private extractScripts(html: string): string[] {
    // TODO: scripts extraction
    return [];
  }
}
