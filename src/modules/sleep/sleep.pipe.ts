import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateSleepDTO } from './sleep.types';

@Injectable()
export class SleepValidationPipe implements PipeTransform {
  async transform(data: CreateSleepDTO): Promise<CreateSleepDTO> {
    const { startTime, endTime, duration } = data;

    if (startTime > endTime) {
      throw new BadRequestException(
        'Start date cannot be greater than end date',
      );
    }

    if (duration && (startTime || endTime)) {
      throw new BadRequestException(
        'Duration cannot be provided with start or end time',
      );
    }

    if (!duration && !startTime && !endTime) {
      throw new BadRequestException(
        'At least one of duration, start time or end time must be provided',
      );
    }

    if (duration && startTime && endTime) {
      throw new BadRequestException(
        'Duration cannot be provided with both start and end time',
      );
    }

    if (startTime && !endTime) {
      throw new BadRequestException(
        'End time must be provided with start time',
      );
    }

    if (!startTime && endTime) {
      throw new BadRequestException(
        'End time must be provided with start time',
      );
    }

    // Add additional validation logic here, e.g., check if startTime and endTime are in the same day

    return data;
  }
}
