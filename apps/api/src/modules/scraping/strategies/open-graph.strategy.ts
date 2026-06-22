import { Injectable } from '@nestjs/common';
import { ExtractStrategy } from '../interfaces/extract-strategy';

@Injectable()
export class OpenGraphStrategy implements ExtractStrategy {
  readonly name: string = 'open-graph';
}
