// signup.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class SignupDto {
  @Expose()
  @IsString()
  @ApiProperty({
    example: 'username',
  })
  username: string;

  @Expose()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'password',
  })
  password: string;
}

export class SigninDto {
  @Expose()
  @IsString()
  @ApiProperty({
    example: 'username',
  })
  username: string;

  @Expose()
  @IsString()
  @ApiProperty({
    example: 'password',
  })
  password: string;
}
