import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput) {
    return await this.prisma.product.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.product.findFirst({
      where: { id },
      include: {
        offers: true,
        alerts: true,
      },
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
