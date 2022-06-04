import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {SwaggerModule} from "@nestjs/swagger";
import {getSwaggerConfig, SWAGGER_CONFIG} from './app/constants/config/swagger.config';
import {ExpressAdapter} from '@nestjs/platform-express';
import {Express} from 'express';
import * as express from 'express';
import {AppModule} from "./app/modules/app.module";
import {initializeFirebaseApp} from "./app/config/firebase.config";
import * as net from 'net';

async function bootstrap() {
  const port = process.env.BACKEND_PORT || 7000;
  const host = process.env.BACKEND_HOST || `0.0.0.0`;
  const contextPath = process.env.BACKEND_CONTEXT_PATH || '/api';
  initializeFirebaseApp();
  const expressApp: Express = express();

  const app = await NestFactory.create(
    AppModule.forRoot(),
    new ExpressAdapter(expressApp),
    {bufferLogs: true,}
  );
  app.setGlobalPrefix(contextPath);
  const document = SwaggerModule.createDocument(app, getSwaggerConfig());
  SwaggerModule.setup(SWAGGER_CONFIG.contextPath, app, document);

  await app.listen(8000, '0.0.0.0');

  const client = net.connect({port: 80, host: "google.com"}, () => {
    Logger.log(`💻 External IP Address: ${client.localAddress}`);
    Logger.log(`⚙️ Loopback IP Address: localhost (127.0.0.1)`);
    Logger.log(`💎 Application is running on ports: 5000`);
    Logger.log(
      `🚀 HTTP API Endpoint is running on: http://${client.localAddress}:${port}${contextPath}`
    );
  });

}

void bootstrap();
