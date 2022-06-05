import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { KeycloakUserInfoDTO } from "../dto/keycloak-user-info.dto";
import { RoomWishlistRepository } from "../repositories/room-wishlist.repository";
import { WishlistBookingRoomRequestDTO } from "../dto/wishlist-booking-room.request.dto";
import { AccountsService } from "./accounts.service";
import { RoomWishlist } from "../models/room-wishlist.entity";

@Injectable()
export class RoomWishlistService {

  constructor(private readonly repository: RoomWishlistRepository,
              private readonly accountService: AccountsService) {
  }

  findAllWishlistBookingRoomsByKeycloakUserId(roomName: string, keycloakUserId: string) {
    return this.repository.findAllByKeycloakUserId(roomName, keycloakUserId);
  }

  async addToWishlist(keycloakUserId: string, wishlist: WishlistBookingRoomRequestDTO) {
    const isWishlistExisted = await this.repository.checkIfWishlistAlreadyExist(wishlist);
    if (isWishlistExisted) {
      throw new BadRequestException("This room wishlist is already existed!");
    }
    const { accountId } = await this.accountService.getUserIdByKeycloakId(keycloakUserId);

    const entity: Partial<RoomWishlist> = {
      createdBy: accountId,
      roomId: wishlist.roomId,
      slotNum: wishlist.slot
    }

    return this.repository.save(entity, {
      transaction: true
    });
  }
}
