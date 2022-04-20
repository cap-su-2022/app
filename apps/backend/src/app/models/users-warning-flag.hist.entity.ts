import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(UsersWarningFlagHistory.name.toLowerCase())
export class UsersWarningFlagHistory {

  @PrimaryGeneratedColumn("uuid",
    {
      name: "id",
      comment: "ID for Users Warning Flag History",
    })
  usersWarningFlagId?: string;

  @Column({
    name: "id",
    nullable: true,
    unique: false,
    length: 36,
    type: 'varchar',
    comment: 'The old ID used for Users Warning Flag',
  })
  id?: string;

  @Column({
    name: "user_id",
    nullable: true,
    unique: false,
    length: 36,
    type: 'varchar',
    comment: 'The used id that references to User table'
  })
  userId?: string;

  @Column({
    name: "warn_num",
    nullable: true,
    unique: false,
    type: 'tinyint',
    comment: 'The number of warnings that user is received.'
  })
  warnNum?: number;

  @Column({
    name: "description",
    nullable: true,
    unique: false,
    length: 500,
    type: 'varchar',
  })
  description?: string;

  @Column({
    name: "created_at",
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'The date that this warning flag is created.'
  })
  createdAt?: Date;

  @Column({
    name: "updated_at",
    nullable: true,
    type: 'timestamp',
    comment: 'The date that this warning flag is updated.'
  })
  updatedAt?: Date;
}
