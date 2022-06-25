import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoomType } from "../enum/room-type.enum";
import {BaseEntity} from "./base/base.entity";

@Entity(Rooms.name.toLowerCase())
export class Rooms extends BaseEntity {

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
}
