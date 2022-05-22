import {ClientOptions, Transport} from "@nestjs/microservices";
import {resolveGRPCProtosPath} from "./grpc.util";

export const GRPC_SERVICES_HOST = 'localhost';

export const USERS_MANAGEMENT_GRPC_SERVICE_NAME = 'KEYCLOAK_USERS_MANAGEMENT_SERVICE';
export const USERS_MANAGEMENT_GRPC_SERVICE_PORT = '50001';
export const USERS_MANAGEMENT_GRPC_SERVICE_URL = `${GRPC_SERVICES_HOST}:${USERS_MANAGEMENT_GRPC_SERVICE_PORT}`;
export const USERS_MANAGEMENT_GRPC_SERVICE_PACKAGE = 'users';
export const USERS_MANAGEMENT_GRPC_SERVICE_PROTO_PATH = resolveGRPCProtosPath('protos/keycloak-users.proto');

export const KEYCLOAK_USERS_MANAGEMENT_GRPC_SERVICE: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: USERS_MANAGEMENT_GRPC_SERVICE_URL,
    package: USERS_MANAGEMENT_GRPC_SERVICE_PACKAGE,
    protoPath: USERS_MANAGEMENT_GRPC_SERVICE_PROTO_PATH,
  }
};
