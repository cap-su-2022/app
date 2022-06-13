import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomWishlistRepository } from "../repositories";
import { RoomWishlistService } from "../services";
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
