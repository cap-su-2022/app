import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("room_wishlist")
export class RoomWishlist {
  @PrimaryGeneratedColumn("uuid", {
    comment: "Id for room wishlist",
    name: "id"
  })
  id?: string;

  @Column({
    type: "uuid",
    name: "room_id",
  })
  roomId: string;

  @Column({
    type: "uuid",
    name: "created_by"
  })
  createdBy: string;

  @Column({
    name: "created_at",
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: "slot_num",
    nullable: false,
    type: "smallint"
  })
  slotNum: number;
}
