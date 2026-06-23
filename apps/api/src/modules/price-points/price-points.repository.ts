import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PricePointsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PricePointCreateInput) {
    return await this.prisma.pricePoint.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.pricePoint.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.pricePoint.findFirst({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.PricePointUpdateInput) {
    return await this.prisma.pricePoint.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.pricePoint.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
