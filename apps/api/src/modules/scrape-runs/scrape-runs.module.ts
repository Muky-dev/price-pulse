import { Module } from '@nestjs/common';
import { ScrapeRunsService } from './scrape-runs.service';
import { ScrapeRunsController } from './scrape-runs.controller';
import { ScrapeRunsRepository } from './scrape-run.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ScrapeRunsController],
  providers: [ScrapeRunsService, ScrapeRunsRepository, PrismaService],
  exports: [ScrapeRunsService],
})
export class ScrapeRunsModule {}
