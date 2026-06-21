import { Test, TestingModule } from '@nestjs/testing';
import { ScrapeRunsService } from './scrape-runs.service';

describe('ScrapeRunsService', () => {
  let service: ScrapeRunsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapeRunsService],
    }).compile();

    service = module.get<ScrapeRunsService>(ScrapeRunsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
