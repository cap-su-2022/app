import { Module } from "@nestjs/common";
import { BookingRoomController } from "../controllers";
import { BookingRoomService } from "../services";
import { AccountRepository, BookingRoomRepository } from "../repositories";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomsModule } from "./rooms.module";
import { KeycloakModule } from "./keycloak.module";
import { RoomWishlistModule } from "./room-wishlist.module";

@Module({
  imports: [
    RoomWishlistModule,
    KeycloakModule,
    RoomsModule,
    TypeOrmModule.forFeature([BookingRoomRepository, AccountRepository])
  ],
  controllers: [
    BookingRoomController
  ],
  providers: [BookingRoomService]
})
export class BookingRoomModule {}
