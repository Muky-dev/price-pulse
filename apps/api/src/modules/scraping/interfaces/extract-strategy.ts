import { ExtractionResult } from './extraction-result';

export interface ExtractStrategy {
  readonly name: string;
  canHandle(html: string): boolean;
  extract(html: string): ExtractionResult;
}
