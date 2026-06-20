import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.VALKEY_HOST,
        port: Number(process.env.VALKEY_PORT),
      },
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
