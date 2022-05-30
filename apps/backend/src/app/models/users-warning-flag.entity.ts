import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(UsersWarningFlag.name.toLowerCase())
export class UsersWarningFlag {

  @PrimaryGeneratedColumn("uuid",
    {
      name: "id",
      comment: "ID for Users Warning Flag",
    })
  id?: string;

  @Column({
    name: "user_id",
    nullable: false,
    unique: true,
    length: 36,
    type: 'varchar',
    comment: 'The used id that references to User table'
  })
  userId?: string;

  @Column({
    name: "warn_num",
    nullable: false,
    unique: false,
    type: 'int',
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
    nullable: false,
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
