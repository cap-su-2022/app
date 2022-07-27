import { Repository } from 'typeorm';
import { RoomWishlist } from '../models';
import { WishlistBookingRoomResponseDTO } from '../dto/wishlist-booking-room.response.dto';
import { WishlistBookingRoomRequestDTO } from '../dto/wishlist-booking-room.request.dto';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';

@CustomRepository(RoomWishlist)
export class RoomWishlistRepository extends Repository<RoomWishlist> {
  findAll(
    roomName: string,
    slotFrom: number,
    slotTo: number,
    accountId: string
  ) {
    return this.createQueryBuilder('room_wishlist')
      .select(
        'room_wishlist.id as id, r.id as roomId, r.name as roomName, room_wishlist.slot_num as slot'
      )
      .innerJoin('rooms', 'r', 'r.id = room_wishlist.room_id')
      .innerJoin('accounts', 'a', 'room_wishlist.created_by = a.id')
      .where('a.id = :id', { id: accountId })
      .andWhere('r.name LIKE :roomName', { roomName: `%${roomName ?? ''}%` })
      .groupBy('room_wishlist.id')
      .addGroupBy('r.id')
      .addGroupBy('room_wishlist.slot_num')
      .having('room_wishlist.slot_num >= :slotFrom', { slotFrom: slotFrom })
      .andHaving('room_wishlist.slot_num <= :slotTo', { slotTo: slotTo })
      .getRawMany<WishlistBookingRoomResponseDTO>();
  }

  addToWishList(keycloakUserId: string, wishlist: RoomWishlist) {
    return this.createQueryBuilder('room_wishlist')
      .insert()
      .into<RoomWishlist>(RoomWishlist, ['room_id', 'created_at'])
      .useTransaction(true)
      .execute();
  }

  async checkIfWishlistAlreadyExist(payload: {
    roomId: string;
    slot: number;
  }): Promise<boolean> {
    return this.createQueryBuilder('room_wishlist')
      .select('COUNT(1)', 'check')
      .where('room_wishlist.room_id = :roomId', { roomId: payload.roomId })
      .andWhere('room_wishlist.slot_num = :slot', { slot: payload.slot })
      .getRawOne()
      .then((data) => data.check > 0);
  }

  removeFromWishlist(accountId: string, roomId: string, slot: number) {
    return this.createQueryBuilder('room_wishlist')
      .delete()
      .where('room_wishlist.created_by = :createdBy', { createdBy: accountId })
      .andWhere('room_wishlist.room_id = :roomId', { roomId: roomId })
      .andWhere('room_wishlist.slot_num = :slot', { slot: slot })
      .useTransaction(true)
      .execute();
  }
} /*
SELECT rw.id, r.id as roomid, r.name as roomName, rw.slot_num as slot FROM room_wishlist rw INNER JOIN accounts a
ON rw.created_by = a.id INNER JOIN rooms r ON r.id = rw.room_id
WHERE r.name LIKE '%%' AND a.keycloak_id = '8c592883-e40d-45dc-a4da-ebb4ec9778c9'
*/
