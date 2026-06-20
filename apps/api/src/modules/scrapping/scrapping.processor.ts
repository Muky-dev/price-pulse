import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUES } from 'src/infrastructure/queue/queues';

@Processor(QUEUES.SCRAPE_OFFER)
export class ScrappingProcessor extends WorkerHost {
  async process(job: Job): Promise<any> {
    console.log(`Processing job ${job.id} with data:`, job.data);
  }
}
