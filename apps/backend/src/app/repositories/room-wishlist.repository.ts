import { Repository } from "typeorm";
import { RoomWishlist } from "../models";
import { WishlistBookingRoomResponseDTO } from "../dto/wishlist-booking-room.response.dto";
import { WishlistBookingRoomRequestDTO } from "../dto/wishlist-booking-room.request.dto";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";

@CustomRepository(RoomWishlist)
export class RoomWishlistRepository extends Repository<RoomWishlist> {

  findAllByKeycloakUserId(roomName: string, keycloakId: string) {
    return this.createQueryBuilder("room_wishlist")
      .select("room_wishlist.id as id, r.id as roomId, r.name as roomName, room_wishlist.slot_num as slot")
      .innerJoin("rooms", "r", "r.id = room_wishlist.room_id")
      .innerJoin("accounts", "a", "room_wishlist.created_by = a.id")
      .where("a.keycloak_id = :keycloakId", {keycloakId: keycloakId})
      .andWhere("r.name LIKE :roomName", {roomName: `%${roomName ?? ""}%`})
      .getRawMany<WishlistBookingRoomResponseDTO>();
  }

  addToWishList(keycloakUserId: string, wishlist: RoomWishlist) {
    return this.createQueryBuilder("room_wishlist")
      .insert()
      .into<RoomWishlist>(RoomWishlist, ["room_id", "created_at"])
      .useTransaction(true)
      .execute();
  }

  async checkIfWishlistAlreadyExist(wishlist: WishlistBookingRoomRequestDTO): Promise<boolean> {
    return this.createQueryBuilder("room_wishlist")
      .select("COUNT(1)", "check")
      .where("room_wishlist.room_id = :roomId", {roomId: wishlist.roomId})
      .andWhere("room_wishlist.slot_num = :slot", {slot: wishlist.slot})
      .getRawOne().then((data) =>  data.check > 0);
  }
}/*
SELECT rw.id, r.id as roomid, r.name as roomName, rw.slot_num as slot FROM room_wishlist rw INNER JOIN accounts a
ON rw.created_by = a.id INNER JOIN rooms r ON r.id = rw.room_id
WHERE r.name LIKE '%%' AND a.keycloak_id = '8c592883-e40d-45dc-a4da-ebb4ec9778c9'
*/
