import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2Hasher {
  async hashPassword(password: string): Promise<string> {
    const passwordHash = await argon2.hash(password);
    return passwordHash;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await argon2.verify(hashedPassword, password);
    return isMatch;
  }
}
