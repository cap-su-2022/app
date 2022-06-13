import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoomType } from "../enum/room-type.enum";

@Entity(Rooms.name.toLowerCase())
export class Rooms {

  @PrimaryGeneratedColumn("uuid", {
    name: "id"
  })
  id?: string;

  @Column({
    name: "name",
    nullable: false,
    unique: true,
    length: 100,
  })
  name?: string;

  @Column({
    name: "description",
    nullable: true,
    length: 500,
    type: "varchar"
  })
  description?: string;

  @Column({
    name: "type",
    nullable: false,
    length: 100,
    default: RoomType.LIBRARY_ROOM
  })
  type?: string;


  @Column({
    name: "created_by",
    nullable: false,
    default: false
  })
  createdBy?: string;

  @Column({
    name: "updated_by",
    nullable: false,
    default: false
  })
  updatedBy?: string;

  @Column({
    name: "disabled_by",
    nullable: false,
    default: false
  })
  disabledBy?: string;

  @Column({
    name: "deleted_by",
    nullable: false,
    default: false
  })
  deletedBy?: string;

  @Column({
    name: "is_disabled",
    nullable: false,
    default: false
  })
  isDisabled?: boolean;

  @Column({
    name: "is_deleted",
    nullable: false,
    default: false
  })
  isDeleted?: boolean;

  @CreateDateColumn({
    name: "created_at"
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt?: Date;

}
