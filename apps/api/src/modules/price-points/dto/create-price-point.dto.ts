import {
  IsCurrency,
  IsDecimal,
  IsDefined,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePricePointDto {
  @IsDecimal()
  price: number;

  @IsCurrency()
  currency?: string;

  @IsOptional()
  available?: boolean;

  @IsString()
  @IsDefined()
  offerId: string;
}
