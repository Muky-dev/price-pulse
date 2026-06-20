import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OffersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.OfferCreateInput) {
    return await this.prisma.offer.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.offer.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.offer.findFirst({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.OfferUpdateInput) {
    return await this.prisma.offer.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.offer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
