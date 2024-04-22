import { IsDate, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateSleepDTO {
  @Expose()
  @IsDate()
  @ApiProperty({
    example: '2024-04-22',
  })
  date: Date;

  @Expose()
  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: '2024-04-23T00:00',
  })
  startTime?: Date;

  @Expose()
  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: '2024-04-23T08:00',
  })
  endTime?: Date;

  @Expose()
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 8,
  })
  duration?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;
}

export class UpdateSleepDTO extends CreateSleepDTO {}
