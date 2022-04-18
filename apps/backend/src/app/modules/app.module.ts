import { Module } from '@nestjs/common';

import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import {KeycloakModule} from "./keycloak.module";
import {RoomsModule} from "./rooms.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rooms} from "../models/rooms.entity";
import {HealthCheckModule} from "./health-check.module";
import {AuthGuard} from "../guards/auth.guard";
import {KeycloakService} from "../services/keycloak.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '54.92.169.139',
    port: 3306,
    username: 'root',
    password: 'Capstone@2022',
    database: 'flrbms',
    entities: [Rooms],
    synchronize: false,
    logging: "all"
  }),
    HttpModule,
    HealthCheckModule,
    KeycloakModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService, KeycloakService, AuthGuard],
})
export class AppModule {}
