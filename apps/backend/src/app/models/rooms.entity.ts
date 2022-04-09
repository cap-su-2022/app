import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Rooms {

  @PrimaryGeneratedColumn("uuid",
    {
      name: "id",
      comment: "ID for Room"
    })
  id: string;

  @Column({
    name: "name",
    nullable: false,
    unique: true,
    length: 100,
  })
  name: string;

  @Column({
    name: "description",
    nullable: true,
    length: 500
  })
  description: string;

  @Column({
    name: "is_activated",
    nullable: false
  })
  isActivated: boolean;

  @Column({
    name: "is_deleted",
    nullable: false,
    default: false
  })
  isDeleted: boolean;

  @Column({
    name: "created_at",
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',

  })
  createdAt: Date;

  @Column({
    name: "updated_at",
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

}
