import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersRepository } from './offers.repository';
import { AuthUser } from '../users/entity/user';

@Injectable()
export class OffersService {
  constructor(private readonly offersRepository: OffersRepository) {}

  async create(createOfferDto: CreateOfferDto, authUser: AuthUser) {
    const offer = this.offersRepository.create({
      createdBy: { connect: { id: authUser.id } },
      url: createOfferDto.url,
    });

    return offer;
  }

  findAll() {
    return this.offersRepository.findAll();
  }

  findOne(id: string) {
    return this.offersRepository.findOne(id);
  }

  remove(id: string) {
    return this.offersRepository.remove(id);
  }
}
