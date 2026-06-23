import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PricePointsService } from './price-points.service';
import { CreatePricePointDto } from './dto/create-price-point.dto';

@Controller('price-points')
export class PricePointsController {
  constructor(private readonly pricePointsService: PricePointsService) {}

  @Post()
  create(@Body() createPricePointDto: CreatePricePointDto) {
    return this.pricePointsService.create(createPricePointDto);
  }

  @Get()
  findAll() {
    return this.pricePointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricePointsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricePointsService.remove(id);
  }
}
