import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getConfig } from './config';
import { UnhandledExceptionsFilter } from './common/filters/unhandledException.filter';
import { DefaultExceptionFilter } from './common/filters/defaultException.filter';
import { json, urlencoded } from 'express';
import { Logger } from '@nestjs/common';
const config = getConfig();
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'fatal', 'verbose'],
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error('unhandled-error', { error, stack: error.stack });
    process.exit(1); // Exit the process or restart it as needed
  });

  process.on('unhandledRejection', (reason: any) => {
    logger.error('unhandled promise', { reason, stack: reason.stack });
  });

  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalFilters(
    new UnhandledExceptionsFilter(),
    new DefaultExceptionFilter(),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Documentation page')
    .setDescription('There is auto documentation')
    .setVersion('v1')
    .addServer(config.APP_HOST, 'Local server')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.APP_PORT);
}
bootstrap();
