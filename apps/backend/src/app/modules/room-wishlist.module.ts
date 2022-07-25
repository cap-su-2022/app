import { Module } from '@nestjs/common';
import {
  RoomWishlistHistRepository,
  RoomWishlistRepository,
} from '../repositories';
import { RoomWishlistService } from '../services';
import { AccountsModule } from './accounts.module';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { RoomWishlistHistService } from '../services/room-wishlist-hist.service';
import { SlotModule } from './slot.module';

@Module({
  imports: [
    AccountsModule,
    SlotModule,
    TypeOrmExModule.forCustomRepository([
      RoomWishlistRepository,
      RoomWishlistHistRepository,
    ]),
  ],
  exports: [RoomWishlistService, RoomWishlistHistService],
  providers: [RoomWishlistService, RoomWishlistHistService],
})
export class RoomWishlistModule {}
