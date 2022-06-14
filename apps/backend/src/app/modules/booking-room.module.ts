import { Module } from "@nestjs/common";
import { BookingRoomController } from "../controllers";
import { BookingRoomService } from "../services";
import { AccountRepository, BookingRoomRepository } from "../repositories";
import { RoomsModule } from "./rooms.module";
import { KeycloakModule } from "./keycloak.module";
import { RoomWishlistModule } from "./room-wishlist.module";
import { TypeOrmExModule } from "./global/typeorm-ex.module";

@Module({
  imports: [
    RoomWishlistModule,
    KeycloakModule,
    RoomsModule,
    TypeOrmExModule.forCustomRepository([BookingRoomRepository, AccountRepository])
  ],
  controllers: [
    BookingRoomController
  ],
  providers: [BookingRoomService]
})
export class BookingRoomModule {}
