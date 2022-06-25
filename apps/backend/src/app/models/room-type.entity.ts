import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base/base.entity";

@Entity('room-type')
export class RoomType extends BaseEntity {
  @PrimaryGeneratedColumn("uuid",
    {
      name: "id",
    })
  id?: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100
  })
  name?: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 500
  })
  description?: string;

}
