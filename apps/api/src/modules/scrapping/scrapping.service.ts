import { Injectable } from '@nestjs/common';
import { ScrappingRepository } from './scrapping.repository';
import { CreateScrapeRunDto } from './dto/create-scrape-run.dto';

@Injectable()
export class ScrappingService {
  constructor(private readonly scrappingRepository: ScrappingRepository) {}

  createRun(data: CreateScrapeRunDto) {
    const { offerId, ...rest } = data;
    return this.scrappingRepository.create({
      ...rest,
      success: false,
      offer: { connect: { id: offerId } },
    });
  }
}
