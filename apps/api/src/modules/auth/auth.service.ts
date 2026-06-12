import { Injectable } from '@nestjs/common';
import { Argon2Hasher } from './argon2-hasher';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hasher: Argon2Hasher,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const passwordHash = await this.hasher.hashPassword(password);

    await this.usersService.create({ name, email, passwordHash });
  }
}
