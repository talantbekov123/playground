import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getConfig } from 'src/config';
const config = getConfig();

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET,
    });
  }

  validate(payload: {
    id: string;
    username: string;
    iat: number;
    exp: number;
  }) {
    return payload;
  }
}
