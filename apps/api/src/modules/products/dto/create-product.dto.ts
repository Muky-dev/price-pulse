import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProductVisibility } from 'generated/prisma/client';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsEnum(ProductVisibility)
  @IsOptional()
  visibility?: ProductVisibility;
}
