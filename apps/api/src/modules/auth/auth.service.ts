import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Argon2Hasher } from './argon2-hasher';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

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

  async login(loginDto: LoginDto) {
    const { name, password } = loginDto;
    const user = await this.usersService.findActiveByName(name);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hasher.comparePassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
