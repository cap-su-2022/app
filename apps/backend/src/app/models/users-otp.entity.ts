import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base/base.entity";

@Entity(UsersOTP.name.toLowerCase())
export class UsersOTP {

  @PrimaryGeneratedColumn("increment",
    {
      name: "id",
      comment: "ID for Users OTP",
      type: 'int',
    })
  id?: number;

  @Column({
    name: 'user_id',
    type: 'varchar',
    length: 36,
    comment: 'The user id that references to Users table',
    nullable: false,
    unique: false
  })
  userId?: string;

  @Column({
    name: 'otp',
    type: 'varchar',
    length: 6,
    comment: 'The OTP that is to authenticating user',
    nullable: false,
    unique: false
  })
  otp: string;

  @Column({
    name: "created_at",
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'The date that the OTP is generated'
  })
  createdAt?: Date;

  @Column({
    name: "used_date",
    nullable: true,
    type: 'timestamp',
    comment: 'The date that the OTP is consumed'
  })
  usedDate?: Date;
}
