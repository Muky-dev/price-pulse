import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { OffersRepository } from './offers.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OffersController],
  providers: [OffersService, OffersRepository, PrismaService],
})
export class OffersModule {}
