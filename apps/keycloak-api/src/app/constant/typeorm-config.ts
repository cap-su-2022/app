import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('db.keycloak.host'),
      port: this.configService.get('db.keycloak.port'),
      username: this.configService.get('db.keycloak.username'),
      password: this.configService.get('db.keycloak.password'),
    };
  }
}
