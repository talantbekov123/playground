import { BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const dtoValidator = async <T>(
  validatingDto: ClassConstructor<T>,
  body: Record<string, any>,
  notExcludeExtraneousValues?: boolean,
) => {
  const validatingDtoObject = plainToClass(validatingDto, body, {
    enableImplicitConversion: true,
    excludeExtraneousValues: !notExcludeExtraneousValues,
  });

  const validationErrors = await validate(validatingDtoObject as any, {
    validationError: { target: false, value: false },
  });

  if (validationErrors.length) {
    throw new BadRequestException(validationErrors);
  }
  return validatingDtoObject;
};
