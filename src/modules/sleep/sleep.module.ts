import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SleepController } from './sleep.controller';
import { SleepService } from './sleep.service';
import { Sleep } from '../../db/entity/Sleep';
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from '../../config';
const config = getConfig();
const { JWT_EXPIRES_IN } = config;

@Module({
  imports: [
    TypeOrmModule.forFeature([Sleep]),
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  controllers: [SleepController],
  providers: [SleepService],
  exports: [SleepService],
})
export class SleepModule {}
