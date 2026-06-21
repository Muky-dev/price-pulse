import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ScrapeRunsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ScrapeRunCreateInput) {
    return this.prisma.scrapeRun.create({
      data,
    });
  }

  findAll() {
    return this.prisma.scrapeRun.findMany();
  }

  findOne(id: string) {
    return this.prisma.scrapeRun.findFirst({
      where: { id },
    });
  }

  update(id: string, data: Prisma.ScrapeRunUpdateInput) {
    return this.prisma.scrapeRun.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.scrapeRun.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
