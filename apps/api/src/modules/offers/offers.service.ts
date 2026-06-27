import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersRepository } from './offers.repository';
import { AuthUser } from '../users/entity/user';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SCRAPE_JOBS } from 'src/infrastructure/queue/jobs/scrape-jobs';
import { OfferJobPayload } from 'src/infrastructure/queue/types/offer-job.type';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    private readonly offersRepository: OffersRepository,
    @InjectQueue('scrape') private readonly scrapeQueue: Queue,
  ) {}

  async create(createOfferDto: CreateOfferDto, authUser: AuthUser) {
    const offer = await this.offersRepository.create({
      createdBy: { connect: { id: authUser.id } },
      url: createOfferDto.url,
    });

    const offerJobPayload: OfferJobPayload = {
      offerId: offer.id,
      url: offer.url,
    };

    await this.scrapeQueue.add(SCRAPE_JOBS.OFFER, offerJobPayload);

    return offer;
  }

  async update(id: string, updateOfferDto: Partial<UpdateOfferDto>) {
    return await this.offersRepository.update(id, updateOfferDto);
  }

  async findAll() {
    return await this.offersRepository.findAll();
  }

  async findOne(id: string) {
    return await this.offersRepository.findOne(id);
  }

  async scrapeOffer(id: string) {
    const offer = await this.offersRepository.findOne(id);

    if (!offer) {
      throw new Error(`Offer with id ${id} not found`);
    }

    const offerJobPayload: OfferJobPayload = {
      offerId: offer.id,
      url: offer.url,
    };

    await this.scrapeQueue.add(SCRAPE_JOBS.OFFER, offerJobPayload);

    return { message: 'Scrape job added to the queue' };
  }

  async findOneWithProduct(id: string) {
    return await this.offersRepository.findOneWithProduct(id);
  }

  async remove(id: string) {
    return await this.offersRepository.remove(id);
  }
}
