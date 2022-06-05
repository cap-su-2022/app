import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomWishlistRepository } from "../repositories/room-wishlist.repository";
import { RoomWishlistService } from "../services/room-wishlist.service";
import { AccountsModule } from "./accounts.module";

@Module({
  imports: [
    AccountsModule,
    TypeOrmModule.forFeature([RoomWishlistRepository])
  ],
  exports: [RoomWishlistService],
  providers: [RoomWishlistService]
})
export class RoomWishlistModule {

}
