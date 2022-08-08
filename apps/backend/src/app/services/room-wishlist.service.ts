import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { RoomWishlistRepository } from '../repositories';
import { WishlistBookingRoomRequestDTO } from '../dto/wishlist-booking-room.request.dto';
import { AccountsService } from './accounts.service';
import { RoomWishlist } from '../models';
import { RemoveWishlistRequest } from '../payload/request/remove-from-booking-room-wishlist.request.payload';
import { RoomWishlistHistService } from './room-wishlist-hist.service';
import { SlotService } from './slot.service';

@Injectable()
export class RoomWishlistService {
  private readonly logger = new Logger(RoomWishlistService.name);

  constructor(
    private readonly repository: RoomWishlistRepository,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountService: AccountsService,
    @Inject(forwardRef(() => RoomWishlistHistService))
    private readonly histService: RoomWishlistHistService,
    @Inject(forwardRef(() => SlotService))
    private readonly slotService: SlotService
  ) {}

  findAllWishlistBookingRooms(
    roomName: string,
    slotFrom: number,
    slotTo: number,
    accountId: string
  ) {
    return this.repository.findAll(roomName, slotFrom, slotTo, accountId);
  }

  async addToWishlist(
    accountId: string,
    wishlist: WishlistBookingRoomRequestDTO
  ) {
    console.log(wishlist.slotId);
    const slot = await this.slotService.getNumOfSlot(wishlist.slotId);
    console.log('SLOT:', slot);
    const isWishlistExisted = await this.repository.checkIfWishlistAlreadyExist(
      {
        ...wishlist,
        slot: slot.slotNum,
      }
    );
    if (isWishlistExisted) {
      throw new BadRequestException('This room wishlist is already existed!');
    }

    const entity: Partial<RoomWishlist> = {
      createdBy: accountId,
      roomId: wishlist.roomId,
      slotNum: slot.slotNum,
    };

    return this.repository.save(entity, {
      transaction: true,
    });
  }

  async removeFromWishlist(accountId: string, payload: RemoveWishlistRequest) {
    try {
      const isWishlistExisted =
        await this.repository.checkIfWishlistAlreadyExist(payload);
      if (!isWishlistExisted) {
        throw new BadRequestException('This room wishlist does not exist!');
      }
      return this.repository.removeFromWishlist(
        accountId,
        payload.roomId,
        payload.slot
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
