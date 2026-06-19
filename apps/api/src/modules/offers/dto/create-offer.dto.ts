import { IsUrl } from 'class-validator';

export class CreateOfferDto {
  @IsUrl({ require_tld: false })
  url: string;
}
