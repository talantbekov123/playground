import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppLoggerMiddleware, AppSessionMiddleware } from './app.middleware';
import { UserModule } from '../user/user.module';
import { AppTypeormModule } from '../appTypeorm/appTypeorm.module';
import { SleepModule } from '../sleep/sleep.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AppTypeormModule, AuthModule, UserModule, SleepModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppSessionMiddleware, AppLoggerMiddleware).forRoutes('*');
  }
}
