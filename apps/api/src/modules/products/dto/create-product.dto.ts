import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProductVisibility } from 'generated/prisma/client';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsEnum(ProductVisibility)
  @IsOptional()
  visibility: ProductVisibility;
}
