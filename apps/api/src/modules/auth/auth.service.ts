import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Argon2Hasher } from './argon2-hasher';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { AccessTokenResponse } from './types/login.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly hasher: Argon2Hasher,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const passwordHash = await this.hasher.hashPassword(password);

    await this.usersService.create({ name, email, passwordHash });
  }

  async login(loginDto: LoginDto): Promise<AccessTokenResponse> {
    const user = await this.validateUser(loginDto);

    const payload = { sub: user.id, username: user.name };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async validateUser(loginDto: LoginDto) {
    const { name, password } = loginDto;

    const user = await this.usersService.findUnsecureByName(name);

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

    return user;
  }
}
