/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {MicroserviceOptions} from "@nestjs/microservices";
import {
  GRPC_SERVICES_HOST,
  KEYCLOAK_USERS_MANAGEMENT_GRPC_SERVICE,
  USERS_MANAGEMENT_GRPC_SERVICE_PORT
} from "./app/grpc-route.constant";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule.forRoot(), KEYCLOAK_USERS_MANAGEMENT_GRPC_SERVICE);
  await app.listen();

  Logger.log(`Microservice ${KEYCLOAK_USERS_MANAGEMENT_GRPC_SERVICE} is listening on`);
  Logger.log(`[ grpc://${GRPC_SERVICES_HOST}:${USERS_MANAGEMENT_GRPC_SERVICE_PORT} ]`);
}

bootstrap();
