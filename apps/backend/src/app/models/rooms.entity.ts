import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base/base.entity";

@Entity(Rooms.name.toLowerCase())
export class Rooms extends BaseEntity{

  @PrimaryGeneratedColumn("uuid",
    {
      name: "id",
      comment: "ID for Room"
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
    length: 500
  })
  description?: string;

}
