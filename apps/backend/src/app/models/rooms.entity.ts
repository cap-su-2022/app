import {BeforeInsert, Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base/base.entity";
import {randomUUID} from "crypto";

@Entity(Rooms.name.toLowerCase())
export class Rooms extends BaseEntity{

  @PrimaryGeneratedColumn("uuid", {
    name: 'id',
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
