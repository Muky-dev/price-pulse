import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.getOrThrow<string>('VALKEY_HOST'),
          port: config.getOrThrow<number>('VALKEY_PORT'),
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
