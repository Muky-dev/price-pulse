import { Injectable } from '@nestjs/common';
import { CreatePricePointDto } from './dto/create-price-point.dto';
import { UpdatePricePointDto } from './dto/update-price-point.dto';
import { PricePointsRepository } from './price-points.repository';

@Injectable()
export class PricePointsService {
  constructor(private readonly pricePointsRepository: PricePointsRepository) {}

  create(createPricePointDto: CreatePricePointDto) {
    const { offerId, ...rest } = createPricePointDto;

    return this.pricePointsRepository.create({
      ...rest,
      offer: { connect: { id: offerId } },
    });
  }

  findAll() {
    return this.pricePointsRepository.findAll();
  }

  findOne(id: string) {
    return this.pricePointsRepository.findOne(id);
  }

  update(id: string, updatePricePointDto: UpdatePricePointDto) {
    return this.pricePointsRepository.update(id, updatePricePointDto);
  }

  remove(id: string) {
    return this.pricePointsRepository.remove(id);
  }
}
