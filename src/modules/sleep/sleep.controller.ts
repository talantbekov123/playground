import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { SleepService } from './sleep.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../common/guards/access.guard';
import { CreateSleepDTO, UpdateSleepDTO } from './sleep.types';
import { Sleep } from '../../db/entity/Sleep';
import { IAuthRequest } from '../../common/types';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SleepValidationPipe } from './sleep.pipe';

@Controller('api/sleep')
export class SleepController {
  constructor(private sleepService: SleepService) {}

  @ApiBearerAuth('bearer')
  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new SleepValidationPipe())
  async create(
    @Req() req: IAuthRequest,
    @Body() data: CreateSleepDTO,
  ): Promise<Sleep> {
    data.userId = req.user.id;
    const sleepEntry = await this.sleepService.create(data);
    return sleepEntry;
  }

  @ApiBearerAuth('bearer')
  @UseGuards(AccessTokenGuard)
  @Put(':sleepId')
  async update(
    @Req() req: IAuthRequest,
    @Param('sleepId') sleepId: number,
    @Body() data: UpdateSleepDTO,
  ): Promise<UpdateResult> {
    const result = await this.sleepService.update(
      { id: sleepId, userId: req.user.id },
      data,
    );
    return result;
  }

  @ApiBearerAuth('bearer')
  @UseGuards(AccessTokenGuard)
  @Delete(':sleepId')
  async delete(
    @Req() req: IAuthRequest,
    @Param('sleepId') sleepId: number,
  ): Promise<DeleteResult> {
    const result = await this.sleepService.delete({
      id: sleepId,
      userId: req.user.id,
    });
    return result;
  }

  @ApiBearerAuth('bearer')
  @UseGuards(AccessTokenGuard)
  @Get('stats')
  async getStats(@Req() req: IAuthRequest): Promise<{ data: string }> {
    const stats = await this.sleepService.getStats(req.user.id);
    return stats;
  }
}
