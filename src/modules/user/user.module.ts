import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entity/User';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from '../../config';
const config = getConfig();
const { JWT_EXPIRES_IN } = config;

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
