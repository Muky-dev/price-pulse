import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScrapeRunsService } from './scrape-runs.service';
import { CreateScrapeRunDto } from './dto/create-scrape-run.dto';
import { UpdateScrapeRunDto } from './dto/update-scrape-run.dto';

@Controller('scrape-runs')
export class ScrapeRunsController {
  constructor(private readonly scrapeRunsService: ScrapeRunsService) {}

  @Post()
  create(@Body() createScrapeRunDto: CreateScrapeRunDto) {
    return this.scrapeRunsService.create(createScrapeRunDto);
  }

  @Get()
  findAll() {
    return this.scrapeRunsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scrapeRunsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScrapeRunDto: UpdateScrapeRunDto,
  ) {
    return this.scrapeRunsService.update(id, updateScrapeRunDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scrapeRunsService.remove(id);
  }
}
