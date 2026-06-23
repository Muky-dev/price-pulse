import { IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class CreateProductWithOfferDto extends CreateProductDto {
  @IsString()
  offerId: string;
}
