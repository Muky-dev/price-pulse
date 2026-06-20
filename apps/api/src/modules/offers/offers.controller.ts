import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../users/entity/user';

@ApiBearerAuth()
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(
    @Body() createOfferDto: CreateOfferDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return await this.offersService.create(createOfferDto, currentUser);
  }

  @Get()
  async findAll() {
    return await this.offersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.offersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.offersService.remove(id);
  }
}
