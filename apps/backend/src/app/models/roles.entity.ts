import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base/base.entity";

@Entity(Roles.name.toLowerCase())
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn("uuid",
    {
      name: "id",
      comment: "ID for Room",
    })
  id?: string;

  @Column({
    name: "name",
    nullable: false,
    unique: true,
    length: 36,
    type: 'varchar',
  })
  name?: string;

  @Column({
    name: "description",
    nullable: false,
    unique: false,
    length: 500,
    type: 'varchar',
  })
  description?: string;

}
