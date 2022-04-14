import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {SwaggerModule} from "@nestjs/swagger";
import {APP_CONFIG} from "./app/constants/config/app.config";
import {getSwaggerConfig, SWAGGER_CONFIG} from './app/constants/config/swagger.config';
import * as path from "path";
import * as fs from 'fs';
import * as compression from 'compression';
import {ExpressAdapter} from '@nestjs/platform-express';
import {Express} from 'express';
import * as express from 'express';
import {server} from "spdy";
import Server = server.Server;
import * as spdy from 'spdy';

async function bootstrap() {
  const port = process.env.BACKEND_PORT || APP_CONFIG.port;
  const host = process.env.BACKEND_HOST || APP_CONFIG.host;
  const contextPath = process.env.BACKEND_CONTEXT_PATH || APP_CONFIG.contextPath;

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
    AppModule,
    new ExpressAdapter(expressApp)
  );
  app.setGlobalPrefix(contextPath);
  app.use(compression({ filter: shouldCompress }));
  const document = SwaggerModule.createDocument(app, getSwaggerConfig());
  SwaggerModule.setup(SWAGGER_CONFIG.contextPath, app, document);
  await app.init();
  await server.listen(port);

  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${contextPath}`
  );
}

void bootstrap();
