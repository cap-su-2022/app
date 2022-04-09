import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {SwaggerModule} from "@nestjs/swagger";
import {APP_CONFIG} from "./app/constants/config/app.config";
import {getSwaggerConfig, SWAGGER_CONFIG} from './app/constants/config/swagger.config';

async function bootstrap() {
  const port = process.env.BACKEND_PORT || APP_CONFIG.port;
  const host = process.env.BACKEND_HOST || APP_CONFIG.host;
  const contextPath = process.env.BACKEND_CONTEXT_PATH || APP_CONFIG.contextPath;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(contextPath);
  const document = SwaggerModule.createDocument(app, getSwaggerConfig());
  SwaggerModule.setup(SWAGGER_CONFIG.contextPath, app, document);
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${contextPath}`
  );
}

void bootstrap();
