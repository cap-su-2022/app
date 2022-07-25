import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RoomWishlistRepository } from '../repositories';
import { WishlistBookingRoomRequestDTO } from '../dto/wishlist-booking-room.request.dto';
import { AccountsService } from './accounts.service';
import { RoomWishlist } from '../models';
import { RemoveWishlistRequest } from '../payload/request/remove-from-booking-room-wishlist.request.payload';
import { RoomWishlistHistService } from './room-wishlist-hist.service';

@Injectable()
export class RoomWishlistService {
  private readonly logger = new Logger(RoomWishlistService.name);

  constructor(
    private readonly repository: RoomWishlistRepository,
    private readonly accountService: AccountsService,
    private readonly histService: RoomWishlistHistService
  ) {}

  findAllWishlistBookingRoomsByKeycloakUserId(
    roomName: string,
    slotFrom: number,
    slotTo: number,
    keycloakUserId: string
  ) {
    return this.repository.findAllByKeycloakUserId(
      roomName,
      slotFrom,
      slotTo,
      keycloakUserId
    );
  }

  async addToWishlist(
    keycloakUserId: string,
    wishlist: WishlistBookingRoomRequestDTO
  ) {
    const isWishlistExisted = await this.repository.checkIfWishlistAlreadyExist(
      wishlist
    );
    if (isWishlistExisted) {
      throw new BadRequestException('This room wishlist is already existed!');
    }
    const accountId = await this.accountService.getUserIdByKeycloakId(
      keycloakUserId
    );

    const entity: Partial<RoomWishlist> = {
      createdBy: accountId,
      roomId: wishlist.roomId,
      slotNum: wishlist.slot,
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
