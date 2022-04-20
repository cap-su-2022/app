import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base/base.entity";
import {Roles} from "./roles.entity";

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn("uuid",
    {
      name: "id",
      comment: "ID for Room",
    })
  id?: string;

  @Column({
    name: "keycloak_id",
    nullable: false,
    unique: true,
    length: 36,
    type: 'varchar',

  })
  keycloakId?: string;

  @Column({
    name: "google_id",
    nullable: false,
    unique: true,
    length: 21,
    type: 'varchar',

  })
  googleId?: string;

  @Column({
    name: "username",
    nullable: false,
    unique: true,
    length: 100,
    type: 'varchar',

  })
  username?: string;

  @Column({
    name: "email",
    nullable: false,
    unique: true,
    length: 100,
    type: 'varchar',

  })
  email?: string;

  @Column({
    name: "phone",
    nullable: false,
    unique: true,
    length: 10,
    type: 'varchar',

  })
  phone?: string;

  @Column({
    name: "description",
    nullable: false,
    unique: false,
    length: 500,
    type: 'varchar',

  })
  description?: string;

  @OneToOne(() => Roles, role => role.user)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id'
  })
  role: Roles;

  @Column({
    name: "effdate",
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  effdate?: Date;
}
