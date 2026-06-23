import { Module } from '@nestjs/common';
import { PricePointsService } from './price-points.service';
import { PricePointsController } from './price-points.controller';
import { PricePointsRepository } from './price-points.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PricePointsController],
  providers: [PricePointsService, PrismaService, PricePointsRepository],
  exports: [PricePointsService],
})
export class PricePointsModule {}
