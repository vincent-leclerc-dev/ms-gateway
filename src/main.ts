import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  // performance
  app.use(compression());

  // security
  app.use(helmet());

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      skipNullProperties: true,
      skipUndefinedProperties: false,
      transform: false,
      whitelist: true, // error thrown when any non-whitelisted property is found
    }),
  );

  // logger
  app.useLogger(app.get(Logger));

  // exception
  app.useGlobalInterceptors(new ExceptionInterceptor());

  // cross origin resource sharing
  app.enableCors();

  // documentation
  const documentBuilder = new DocumentBuilder()
    .setTitle(configService.get<string>('name'))
    .setDescription(configService.get<string>('description'))
    .setVersion(configService.get<string>('version'))
    .addTag(configService.get<string[]>('keywords').join(','))
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(configService.get<number>('port'));
}

bootstrap();
