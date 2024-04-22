import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
const logger = new Logger('Filter');

@Catch(HttpException)
export class DefaultExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    logger.warn(request, {
      exception: exception.getResponse(),
      stack: exception.stack,
    });

    response.status(status).json(exception.getResponse());
  }
}
