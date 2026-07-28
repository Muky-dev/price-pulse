import { Injectable, Logger } from '@nestjs/common';
import { CreatePricePointDto } from './dto/create-price-point.dto';
import { UpdatePricePointDto } from './dto/update-price-point.dto';
import { PricePointsRepository } from './price-points.repository';
import { ExtractionResult } from '../scraping/interfaces/extraction-result';

@Injectable()
export class PricePointsService {
  constructor(private readonly pricePointsRepository: PricePointsRepository) {}

  async create(createPricePointDto: CreatePricePointDto) {
    const { offerId, ...rest } = createPricePointDto;

    return await this.pricePointsRepository.create({
      ...rest,
      offer: { connect: { id: offerId } },
    });
  }

  async findAll() {
    return await this.pricePointsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.pricePointsRepository.findOne(id);
  }

  async registerPricePointFromExtraction(
    offerId: string,
    extraction: ExtractionResult,
  ): Promise<boolean> {
    try {
      if (extraction.price === undefined) {
        Logger.warn(
          `Price is undefined for offerId: ${offerId}`,
          'ScrapeOfferService',
        );
        return false;
      }

      await this.create({
        offerId,
        price: extraction.price,
        currency: extraction.currency,
      });

      return true;
    } catch {
      Logger.error(
        `Failed to register price point for offerId: ${offerId}`,
        'ScrapeOfferService',
      );
      return false;
    }
  }

  async update(id: string, updatePricePointDto: UpdatePricePointDto) {
    return await this.pricePointsRepository.update(id, updatePricePointDto);
  }

  async remove(id: string) {
    return await this.pricePointsRepository.remove(id);
  }
}
