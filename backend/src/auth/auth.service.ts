import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export interface AuthResult {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
  generatedPassword?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private generateRandomPassword(length = 8): string {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }

  async registerOrLogin(email: string, name: string): Promise<AuthResult> {
    let user = await this.usersRepository.findOne({ where: { email } });
    let generatedPassword: string | undefined;

    if (!user) {
      generatedPassword = this.generateRandomPassword();
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      user = this.usersRepository.create({
        email,
        name,
        password: hashedPassword,
      });
      await this.usersRepository.save(user);
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    const result: AuthResult = {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };

    if (generatedPassword) {
      result.generatedPassword = generatedPassword;
    }

    return result;
  }
}