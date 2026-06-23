import { Test, TestingModule } from '@nestjs/testing';
import { PricePointsController } from './price-points.controller';
import { PricePointsService } from './price-points.service';

describe('PricePointsController', () => {
  let controller: PricePointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricePointsController],
      providers: [PricePointsService],
    }).compile();

    controller = module.get<PricePointsController>(PricePointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
