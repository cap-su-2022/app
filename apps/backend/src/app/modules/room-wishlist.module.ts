import { Module } from "@nestjs/common";
import { RoomWishlistRepository } from "../repositories";
import { RoomWishlistService } from "../services";
import { AccountsModule } from "./accounts.module";
import { TypeOrmExModule } from "./global/typeorm-ex.module";

@Module({
  imports: [
    AccountsModule,
    TypeOrmExModule.forCustomRepository([RoomWishlistRepository])
  ],
  exports: [RoomWishlistService],
  providers: [RoomWishlistService]
})
export class RoomWishlistModule {

}
