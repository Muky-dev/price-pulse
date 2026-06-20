import { IsDate, IsString } from 'class-validator';

export class CreateScrapeRunDto {
  @IsString()
  strategy: string;

  @IsDate()
  startedAt: Date;

  @IsString()
  offerId: string;
}
