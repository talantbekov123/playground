import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
const logger = new Logger('Filter');

@Catch()
export class UnhandledExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    logger.error(exception.toString(), (exception as Error).stack);

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'Internal Server Error';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
