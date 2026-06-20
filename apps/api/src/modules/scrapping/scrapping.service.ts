import { Injectable } from '@nestjs/common';
import { ScrappingRepository } from './scrapping.repository';

@Injectable()
export class ScrappingService {
  constructor(private readonly scrappingRepository: ScrappingRepository) {}
  createRun(data: any) {
    return this.scrappingRepository.create(data);
  }
}
