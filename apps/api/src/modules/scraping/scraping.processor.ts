import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUES } from 'src/infrastructure/queue/queues';
import { OfferJobPayload } from 'src/infrastructure/queue/types/offer-job.type';
import { ScrapeOfferService } from './scrape-offer.service';
import { Logger } from '@nestjs/common';

@Processor(QUEUES.SCRAPE)
export class ScrapingProcessor extends WorkerHost {
  constructor(private readonly scrapeOfferService: ScrapeOfferService) {
    super();
  }

  async process(job: Job<OfferJobPayload>): Promise<any> {
    Logger.log(`Processing job ${job.id} - ${job.name}`, 'queue');

    await this.scrapeOfferService.execute(job.data);

    Logger.log(`Finished processing job ${job.id} - ${job.name}`, 'queue');
    return {};
  }
}
