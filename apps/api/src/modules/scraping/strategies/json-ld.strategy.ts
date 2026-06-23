import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { ExtractStrategy } from '../interfaces/extract-strategy';
import { ExtractionResult } from '../interfaces/extraction-result';

interface JsonLdProduct {
  '@type': string;
  name?: string;
  offers?: {
    price?: string | number;
    priceCurrency?: string;
    seller?: {
      name?: string;
    };
  };
}

@Injectable()
export class JsonLdStrategy implements ExtractStrategy {
  readonly name: string = 'json-ld';

  canHandle(html: string): boolean {
    return html.includes('application/ld+json');
  }

  extract(html: string): ExtractionResult {
    const scripts = this.extractScripts(html);

    const json = scripts.map((s) => JSON.parse(s) as JsonLdProduct).flat();

    const product = json.find((x) => x['@type'] === 'Product');

    return {
      productTitle: product?.name,
      price: product?.offers?.price
        ? Number(product?.offers?.price)
        : undefined,
      storeName: product?.offers?.seller?.name,
      currency: product?.offers?.priceCurrency,
    };
  }

  private extractScripts(html: string): string[] {
    const $ = cheerio.load(html);
    const scripts: string[] = [];

    $('script[type="application/ld+json"]').each((_, el) => {
      const content = $(el).html();
      if (content) {
        scripts.push(content);
      }
    });

    return scripts;
  }
}
