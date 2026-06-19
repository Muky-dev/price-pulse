import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OffersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.OfferCreateInput) {
    return this.prisma.offer.create({
      data,
    });
  }

  findAll() {
    return this.prisma.offer.findMany();
  }

  findOne(id: string) {
    return this.prisma.offer.findFirst({
      where: { id },
    });
  }

  update(id: string, data: Prisma.OfferUpdateInput) {
    return this.prisma.offer.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.offer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
