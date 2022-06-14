import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { SwaggerModule } from "@nestjs/swagger";
import { getSwaggerConfig, SWAGGER_CONFIG } from "./app/constants/config/swagger.config";
import { AppModule } from "./app/modules/app.module";
import { initializeFirebaseApp } from "./app/config/firebase.config";
import * as net from "net";
import { fastifyHelmet } from "fastify-helmet";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import compression from "fastify-compress";
import { contentParser } from "fastify-multer";

async function bootstrap() {
  const port = process.env.BACKEND_PORT || 5000;
  const host = process.env.BACKEND_HOST || `0.0.0.0`;
  const contextPath = process.env.BACKEND_CONTEXT_PATH || "/api";
  const firebaseProjectId = initializeFirebaseApp();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule.forRoot(),
    new FastifyAdapter({
      logger: true
    }),
    { bufferLogs: true }
  );
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(contextPath);
  app.enableCors();
  await app.register(contentParser);
  await app.register(compression);
  await app.register(fastifyHelmet, {
    global: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          "cdn.jsdelivr.net",
          "fonts.googleapis.com"
        ],
        fontSrc: [`'self'`, "fonts.gstatic.com"],
        imgSrc: [`'self'`, "data:", "cdn.jsdelivr.net"],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`]
      }
    }
  });
  // app.useStaticAssets({ root: join(__dirname, '../../fastify-file-upload') });
  const document = SwaggerModule.createDocument(app, getSwaggerConfig());
  SwaggerModule.setup(SWAGGER_CONFIG.contextPath, app, document);

  await app.listen(port, host);

  const client = net.connect({ port: 80, host: "google.com" }, () => {
    Logger.debug(`💻 [IP] External Address: ${client.localAddress}`);
    Logger.debug(`⚙️ [IP] Loopback Address: localhost (127.0.0.1)`);
    Logger.debug(`[Firebase] Initialized with project id: ${firebaseProjectId}`);

    Logger.debug(
      `[API] Running on: http://${client.localAddress}:${port}${contextPath}`
    );
  });

}

void bootstrap();
