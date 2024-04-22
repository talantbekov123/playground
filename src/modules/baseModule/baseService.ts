import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { startOfWeek, endOfWeek } from 'date-fns';
import { UpdateSleepDTO } from '../sleep/sleep.types';

@Injectable()
export class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const entity = await this.repository.create(data as T);
    return await this.repository.save(entity);
  }

  async delete(params: FindOptionsWhere<T>): Promise<DeleteResult> {
    const deleteResult = await this.repository.delete(params);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(
        `Entity with params ${Object.keys(params)} not found`,
      );
    }
    return deleteResult;
  }

  async update(
    params: FindOptionsWhere<T>,
    data: UpdateSleepDTO,
  ): Promise<UpdateResult> {
    const updateResult = await this.repository.update(
      params,
      data as Record<string, any>,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(
        `Entity with params ${Object.keys(params)} not found`,
      );
    }

    return updateResult;
  }

  async getStats(userId: number): Promise<{
    averageDuration: number;
    averageStartTime: number;
    averageEndTime: number;
  }> {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    const weeklyStats: {
      averageDuration: number;
      averageStartTime: number;
      averageEndTime: number;
    } = await this.repository
      .createQueryBuilder('sleep')
      .select(['AVG(sleep.duration) AS "averageDuration"'])
      .addSelect(
        "AVG(DATE_PART('hour', sleep.startTime) * 3600000 + DATE_PART('minute', sleep.startTime) * 60000 + DATE_PART('second', sleep.startTime) * 1000)",
        'averageStartTime',
      )
      .addSelect(
        "AVG(DATE_PART('hour', sleep.endTime) * 3600000 + DATE_PART('minute', sleep.endTime) * 60000 + DATE_PART('second', sleep.endTime) * 1000)",
        'averageEndTime',
      )
      .where('sleep.userId = :userId', { userId })
      .andWhere('sleep.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawOne();

    weeklyStats.averageDuration =
      (weeklyStats.averageDuration +
        (weeklyStats.averageEndTime - weeklyStats.averageStartTime)) /
      2;

    return {
      averageDuration: weeklyStats.averageDuration || 0,
      averageStartTime: weeklyStats.averageStartTime || 0,
      averageEndTime: weeklyStats.averageEndTime || 0,
    };
  }
}
