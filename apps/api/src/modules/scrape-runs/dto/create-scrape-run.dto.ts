import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateScrapeRunDto {
  @IsString()
  @IsOptional()
  strategy?: string;

  @IsDate()
  startedAt: Date;

  @IsString()
  offerId: string;
}
