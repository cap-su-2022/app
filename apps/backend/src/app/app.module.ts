import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {KeycloakModule} from "./modules/keycloak.module";
import {RoomsModule} from "./modules/rooms.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rooms} from "./models/rooms.entity";

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
    KeycloakModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
