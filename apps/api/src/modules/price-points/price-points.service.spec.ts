import { Test, TestingModule } from '@nestjs/testing';
import { PricePointsService } from './price-points.service';

describe('PricePointsService', () => {
  let service: PricePointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricePointsService],
    }).compile();

    service = module.get<PricePointsService>(PricePointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
