import { PartialType } from '@nestjs/swagger';
import { CreatePricePointDto } from './create-price-point.dto';

export class UpdatePricePointDto extends PartialType(CreatePricePointDto) {}
