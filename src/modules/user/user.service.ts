import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entity/User';
import { Repository } from 'typeorm';
import { getConfig } from 'src/config';
import { JwtService } from '@nestjs/jwt';
const config = getConfig();
const { JWT_EXPIRES_IN } = config;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(username: string, password: string): Promise<string> {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = this.userRepository.create({ username, password });
    await this.userRepository.save(user);

    const payload = { username, id: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return accessToken;
  }

  async signin(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessTokenPayload = { username: user.username, id: user.id };
    const refreshTokenPayload = {
      username: user.username,
      id: user.id,
      type: 'refresh',
    };
    const accessToken = this.jwtService.sign(accessTokenPayload);
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }
}
