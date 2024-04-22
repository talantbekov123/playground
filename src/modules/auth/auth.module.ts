import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { UserModule } from '../user/user.module';
import { getConfig } from '../../config';
const config = getConfig();
const { JWT_EXPIRES_IN } = config;

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
    UserModule,
  ],
  providers: [AccessTokenStrategy],
  exports: [],
})
export class AuthModule {}
