import { Injectable } from '@nestjs/common';
import { CreateScrapeRunDto } from './dto/create-scrape-run.dto';
import { UpdateScrapeRunDto } from './dto/update-scrape-run.dto';
import { ScrapeRunsRepository } from './scrape-run.repository';

@Injectable()
export class ScrapeRunsService {
  constructor(private readonly scrapeRunsRepository: ScrapeRunsRepository) {}

  create(createScrapeRunDto: CreateScrapeRunDto) {
    const { offerId, ...rest } = createScrapeRunDto;
    return this.scrapeRunsRepository.create({
      ...rest,
      success: false,
      offer: { connect: { id: offerId } },
    });
  }

  findAll() {
    return this.scrapeRunsRepository.findAll();
  }

  findOne(id: string) {
    return this.scrapeRunsRepository.findOne(id);
  }

  update(id: string, updateScrapeRunDto: UpdateScrapeRunDto) {
    return this.scrapeRunsRepository.update(id, updateScrapeRunDto);
  }

  remove(id: string) {
    return this.scrapeRunsRepository.remove(id);
  }
}
