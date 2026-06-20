import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUES } from 'src/infrastructure/queue/queues';
import { OfferJobPayload } from 'src/infrastructure/queue/types/offer-job.type';
import { ScrappingService } from './scrapping.service';

@Processor(QUEUES.SCRAPE)
export class ScrappingProcessor extends WorkerHost {
  constructor(private readonly scrappingService: ScrappingService) {
    super();
  }

  async process(job: Job<OfferJobPayload>): Promise<any> {
    const startedAt: Date = new Date();
    console.log(`Processing job ${job.id} with data:`, job.data);

    try {
      await this.scrappingService.createRun({
        startedAt,
        offerId: job.data.offerId,
        strategy: 'ld',
      });
    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error);
    }

    console.log(`Finished processing job ${job.id}`);
    return {};
  }
}
