import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(
    request: Request & { session: { traceId: string } },
    response: Response,
    next: NextFunction,
  ): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    const originalSend = response.send;
    response.send = function (body: any): any {
      originalSend.call(response, body);
    };

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${url} ${
          request.get('host') + request.originalUrl
        } ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}

@Injectable()
export class AppSessionMiddleware implements NestMiddleware {
  use(
    request: Request & { session: { traceId: string } },
    response: Response,
    next: NextFunction,
  ): void {
    next();
  }
}
