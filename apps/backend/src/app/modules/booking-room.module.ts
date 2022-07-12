import { Module } from "@nestjs/common";
import { BookingRoomController } from "../controllers";
import { BookingRoomService } from "../services";
import { AccountRepository, BookingRoomRepository } from "../repositories";
import { RoomsModule } from "./rooms.module";
import { KeycloakModule } from "./keycloak.module";
import { RoomWishlistModule } from "./room-wishlist.module";
import { TypeOrmExModule } from "./global/typeorm-ex.module";
import { DevicesModule } from "./devices.module";
import { TasksService } from "../services/task.service";
import { ScheduleModule } from "@nestjs/schedule";
import { AccountsModule } from "./accounts.module";
import { RoomTypeModule } from "./room-type.module";

@Module({
  imports: [
    DevicesModule,
    RoomWishlistModule,
    KeycloakModule,
    RoomsModule,
    AccountsModule,
    RoomTypeModule,

    TypeOrmExModule.forCustomRepository([BookingRoomRepository, AccountRepository])
  ],
  controllers: [
    BookingRoomController
  ],
  providers: [BookingRoomService, TasksService],
  exports: [
    BookingRoomService
  ]
})
export class BookingRoomModule {}
