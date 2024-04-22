import { Expose, Type, plainToClass } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

export class ConfigDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  ENV!: string;

  @Type(() => Number)
  @Expose()
  @IsInt()
  @IsNotEmpty()
  APP_PORT!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  APP_HOST!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_HOST!: string;

  @Type(() => Number)
  @Expose()
  @IsInt()
  @IsNotEmpty()
  DB_PORT!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_NAME!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_USER!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_PASSWORD!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DATADOG_SERVICE_NAME!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DATADOG_API_KEY!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  ENCRYPTION_KEY!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  IV!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_SECRET!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN!: string;
}

export const getConfig = (): ConfigDto => {
  const config = plainToClass(ConfigDto, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  return config;
};
