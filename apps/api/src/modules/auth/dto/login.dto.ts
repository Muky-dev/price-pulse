import { IsLowercase, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(2)
  @IsLowercase()
  name: string;

  @IsString()
  password: string;
}
