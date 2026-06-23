import { Injectable } from '@nestjs/common';
import { JsonLdStrategy } from './strategies/json-ld.strategy';
import { MicrodataStrategy } from './strategies/microdata.strategy';
import { OpenGraphStrategy } from './strategies/open-graph.strategy';

@Injectable()
export class StrategyRegistry {
  constructor(
    private readonly jsonLdStrategy: JsonLdStrategy,
    private readonly microdataStrategy: MicrodataStrategy,
    private readonly openGraphStrategy: OpenGraphStrategy,
  ) {}

  getAll() {
    return [
      this.jsonLdStrategy,
      this.microdataStrategy,
      this.openGraphStrategy,
    ];
  }
}
