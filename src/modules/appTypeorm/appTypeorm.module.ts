import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from 'src/config';
import { entities } from '../../db/entity';
const config = getConfig();
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = config;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        logging: false,
        synchronize: false,
        migrationsRun: false,
        entities,
      }),
    }),
  ],
})
export class AppTypeormModule {}
