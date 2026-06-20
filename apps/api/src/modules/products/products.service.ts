import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { AuthUser } from '../users/entity/user';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  create(createProductDto: CreateProductDto, authUser: AuthUser) {
    return this.productsRepository.create({
      ...createProductDto,
      createdBy: { connect: { id: authUser.id } },
    });
  }

  findAll() {
    return this.productsRepository.findAll();
  }

  findOne(id: string) {
    return this.productsRepository.findOne(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productsRepository.remove(id);
  }
}
