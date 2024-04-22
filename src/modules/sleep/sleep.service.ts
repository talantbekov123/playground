import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../baseModule/baseService';
import { Sleep } from '../../db/entity/Sleep';
import { getConfig } from 'src/config';
import { CreateSleepDTO } from './sleep.types';
const config = getConfig();
console.log(config);

@Injectable()
export class SleepService extends BaseService<Sleep> {
  constructor(
    @InjectRepository(Sleep)
    private readonly sleepRepository: Repository<Sleep>,
  ) {
    super(sleepRepository);
  }
}
