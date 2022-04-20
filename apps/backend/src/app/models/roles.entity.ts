import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base/base.entity";
import {Users} from "./users.entity";

@Entity('roles')
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

  @OneToOne(() => Users, user => user.role)
  user: Users;

}
