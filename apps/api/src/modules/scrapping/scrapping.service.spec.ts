import { Test, TestingModule } from '@nestjs/testing';
import { ScrapeOfferService } from './scrape-offer.service';

describe('ScrapeOfferService', () => {
  let service: ScrapeOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapeOfferService],
    }).compile();

    service = module.get<ScrapeOfferService>(ScrapeOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
