import { Module } from "@nestjs/common";
import { BookingRoomController } from "../controllers/booking-room.controller";
import { BookingRoomService } from "../services/booking-room.service";
import { BookingRoomRepository } from "../repositories/booking-room.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomsModule } from "./rooms.module";
import { KeycloakModule } from "./keycloak.module";
import { RoomWishlistModule } from "./room-wishlist.module";
import { AccountsModule } from "./accounts.module";

@Module({
  imports: [
    RoomWishlistModule,
    KeycloakModule,
    RoomsModule,
    TypeOrmModule.forFeature([BookingRoomRepository])
  ],
  controllers: [BookingRoomController],
  providers: [BookingRoomService]
})
export class BookingRoomModule {}
