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
  const port = process.env.BACKEND_PORT || 5000;
  const host = process.env.BACKEND_HOST || `0.0.0.0`;
  const contextPath = process.env.BACKEND_CONTEXT_PATH || "/api";
  const firebaseProjectId = initializeFirebaseApp();
  const expressApp: Express = express();

  const app = await NestFactory.create(
    AppModule.forRoot(),
    new ExpressAdapter(expressApp),
    {bufferLogs: true,}
  );
  app.setGlobalPrefix(contextPath);
  const document = SwaggerModule.createDocument(app, getSwaggerConfig());
  SwaggerModule.setup(SWAGGER_CONFIG.contextPath, app, document);

  await app.listen(port, host);

  const client = net.connect({port: 80, host: "google.com"}, () => {
    Logger.debug(`💻 [IP] External Address: ${client.localAddress}`);
    Logger.debug(`⚙️ [IP] Loopback Address: localhost (127.0.0.1)`);
    Logger.debug(`[Firebase] Initialized with project id: ${firebaseProjectId}`);

    Logger.debug(
      `[API] Running on: http://${client.localAddress}:${port}${contextPath}`
    );
  });

}

void bootstrap();
