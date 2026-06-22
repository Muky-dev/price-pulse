import { Injectable } from '@nestjs/common';
import { JsonLdStrategy } from './strategies/json-ld.strategy';
import { MicrodataStrategy } from './strategies/microdata.strategy';

@Injectable()
export class StrategyRegistry {
  constructor(
    private readonly jsonLdStrategy: JsonLdStrategy,
    private readonly microdataStrategy: MicrodataStrategy,
  ) {}

  getAll() {
    return [this.jsonLdStrategy, this.microdataStrategy];
  }
}
