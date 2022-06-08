import {BeforeInsert, Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base/base.entity";
import {randomUUID} from "crypto";

@Entity(Accounts.name.toLocaleLowerCase())
export class Accounts extends BaseEntity {

  @PrimaryColumn("uuid",
    {
      name: "id",
      comment: "ID for Room",
    })
  @Generated("uuid")
  id?: string;

  @Column({
    name: "keycloak_id",
    nullable: false,
    unique: true,
    length: 36,
    type: 'varchar',
    comment: 'The keycloak account id that associated with this user.'
  })
  keycloakId?: string;

  @Column({
    name: "google_id",
    nullable: false,
    unique: true,
    length: 21,
    type: 'varchar',
    comment: 'The google account id that associated with this user.'
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
    name: "fullname",
    nullable: false,
    unique: true,
    length: 200,
    type: 'varchar',

  })
  fullname?: string;

  @Column({
    name: "email",
    nullable: false,
    unique: true,
    length: 100,
    type: 'varchar',
    comment: 'The email of the user'
  })
  email?: string;

  @Column({
    name: "phone",
    nullable: false,
    unique: true,
    length: 10,
    type: 'varchar',
    comment: 'The phone number of the user'
  })
  phone?: string;

  @Column({
    name: "description",
    nullable: false,
    unique: false,
    length: 500,
    type: 'varchar',
    comment: 'Describe the user.'

  })
  description?: string;

  @Column({
    name: "effdate",
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'The date that user is enabled.'
  })
  effdate?: Date;

  @Column({
    name: "inactive_date",
    nullable: true,
    type: 'timestamp',
    comment: 'The date that user is disabled.'
  })
  inactiveDate?: Date;

  @Column({
    name: "role",
    type: "varchar",
    length: "36",
    nullable: false,
    comment: "Role of the associated user."
  })
  role?: string;

  @Column({
    name: "avatar",
    nullable: false,
    unique: true,
    length: 256,
    type: 'varchar',

  })
  avatar?: string;

}
