import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { AuthUser } from '../users/entity/user';
import { CreateProductWithOfferDto } from './dto/create-product-with-offer.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto, authUser: AuthUser) {
    return await this.productsRepository.create({
      ...createProductDto,
      createdBy: { connect: { id: authUser.id } },
    });
  }

  async createByScrapeRun(
    createProductWithOfferDto: CreateProductWithOfferDto,
  ) {
    const { offerId, ...rest } = createProductWithOfferDto;

    return await this.productsRepository.create({
      ...rest,
      offers: {
        connect: { id: offerId },
      },
    });
  }

  async findAll() {
    return await this.productsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.productsRepository.findOne(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productsRepository.remove(id);
  }
}
