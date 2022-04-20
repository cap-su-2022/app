import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {SwaggerModule} from "@nestjs/swagger";
import {APP_CONFIG} from "./app/constants/config/app.config";
import {getSwaggerConfig, SWAGGER_CONFIG} from './app/constants/config/swagger.config';
import * as path from "path";
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as compression from 'compression';
import {ExpressAdapter} from '@nestjs/platform-express';
import {Express} from 'express';
import * as express from 'express';
import {server} from "spdy";
import Server = server.Server;
import * as spdy from 'spdy';
import {AppModule} from "./app/modules/app.module";
import {initializeFirebaseApp} from "./app/config/firebase.config";
import * as net from 'net';

async function bootstrap() {
  const port = process.env.BACKEND_PORT || APP_CONFIG.port;
  const host = process.env.BACKEND_HOST || APP_CONFIG.host;
  const contextPath = process.env.BACKEND_CONTEXT_PATH || APP_CONFIG.contextPath;
  initializeFirebaseApp();
  const expressApp: Express = express();

  const options = {
    key: fs.readFileSync(path.join(__dirname, '../../../privateKey.key')),
    cert: fs.readFileSync(path.join(__dirname, '../../../certificate.crt'))
  }

  const shouldCompress = (req, res) => {
    // don't compress responses asking explicitly not
    if (req.headers['x-no-compression']) {
      return false
    }
    return compression.filter(req, res)
  }

  const server: Server = spdy.createServer(options, expressApp);


  const app = await NestFactory.create(
    AppModule.forRoot(),
    new ExpressAdapter(expressApp),
    {bufferLogs: true,}
  );
  app.setGlobalPrefix(contextPath);
  app.use(compression({filter: shouldCompress}));
  const document = SwaggerModule.createDocument(app, getSwaggerConfig());
  SwaggerModule.setup(SWAGGER_CONFIG.contextPath, app, document);

  await app.listen(5000, '0.0.0.0');
  await server.listen(5001, '0.0.0.0');



  const client = net.connect({port: 80, host: "google.com"}, () => {
    Logger.log(`💻 External IP Address: ${client.localAddress}`);
    Logger.log(`⚙️ Loopback IP Address: localhost (127.0.0.1)`);
    Logger.log(`💎 Application is running on ports: 5000, 5001`);
    Logger.log(
      `🚀 HTTP API Endpoint is running on: http://${client.localAddress}:${port}${contextPath}`
    );
    Logger.log(
      `🧨 HTTPS API Endpoint is running on: https://${client.localAddress}:${5001}${contextPath}`
    );
  });

}

void bootstrap();
