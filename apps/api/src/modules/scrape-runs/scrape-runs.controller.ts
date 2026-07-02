import { Controller, Get, Param } from '@nestjs/common';
import { ScrapeRunsService } from './scrape-runs.service';

@Controller('scrape-runs')
export class ScrapeRunsController {
  constructor(private readonly scrapeRunsService: ScrapeRunsService) {}

  @Get()
  findAll() {
    return this.scrapeRunsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scrapeRunsService.findOne(id);
  }
}
