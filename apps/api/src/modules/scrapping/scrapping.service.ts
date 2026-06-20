import { Injectable } from '@nestjs/common';
import { ScrappingRepository } from './scrapping.repository';
import { CreateScrapeRunDto } from './dto/create-scrape-run.dto';

@Injectable()
export class ScrappingService {
  constructor(private readonly scrappingRepository: ScrappingRepository) {}

  createRun(data: CreateScrapeRunDto) {
    return this.scrappingRepository.create({
      ...data,
      success: false,
      offer: { connect: { id: data.offerId } },
    });
  }
}
