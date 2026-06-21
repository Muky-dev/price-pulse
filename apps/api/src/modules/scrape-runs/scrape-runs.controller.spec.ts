import { Test, TestingModule } from '@nestjs/testing';
import { ScrapeRunsController } from './scrape-runs.controller';
import { ScrapeRunsService } from './scrape-runs.service';

describe('ScrapeRunsController', () => {
  let controller: ScrapeRunsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapeRunsController],
      providers: [ScrapeRunsService],
    }).compile();

    controller = module.get<ScrapeRunsController>(ScrapeRunsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
