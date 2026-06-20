import { Module } from '@nestjs/common';
import { ScrappingService } from './scrapping.service';
import { BullModule } from '@nestjs/bullmq';
import { ScrappingProcessor } from './scrapping.processor';
import { QUEUES } from 'src/infrastructure/queue/queues';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES.SCRAPE_OFFER,
    }),
  ],
  providers: [ScrappingService, ScrappingProcessor],
})
export class ScrappingModule {}
