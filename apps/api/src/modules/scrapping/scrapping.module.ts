import { Module } from '@nestjs/common';
import { ScrappingService } from './scrapping.service';
import { BullModule } from '@nestjs/bullmq';
import { ScrappingProcessor } from './scrapping.processor';
import { QUEUES } from 'src/infrastructure/queue/queues';
import { ScrappingRepository } from './scrapping.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES.SCRAPE,
    }),
  ],
  providers: [
    ScrappingService,
    ScrappingProcessor,
    ScrappingRepository,
    PrismaService,
  ],
})
export class ScrappingModule {}
