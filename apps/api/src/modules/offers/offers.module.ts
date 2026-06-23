import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { OffersRepository } from './offers.repository';
import { PrismaService } from 'src/prisma.service';
import { BullModule } from '@nestjs/bullmq';
import { QUEUES } from 'src/infrastructure/queue/queues';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES.SCRAPE,
    }),
  ],
  controllers: [OffersController],
  providers: [OffersService, OffersRepository, PrismaService],
  exports: [OffersService],
})
export class OffersModule {}
