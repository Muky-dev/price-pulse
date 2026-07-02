import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { PrismaService } from './prisma.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt.guard';
import { OffersModule } from './modules/offers/offers.module';
import { ProductsModule } from './modules/products/products.module';
import { ScrapingModule } from './modules/scraping/scraping.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { BrowserModule } from './infrastructure/browser/browser.module';
import { ScrapeRunsModule } from './modules/scrape-runs/scrape-runs.module';
import { PricePointsModule } from './modules/price-points/price-points.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    BrowserModule,
    QueueModule,
    AuthModule,
    UsersModule,
    OffersModule,
    ProductsModule,
    ScrapingModule,
    ScrapeRunsModule,
    PricePointsModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
