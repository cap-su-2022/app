import {Column, Entity} from "typeorm";

@Entity()
export abstract class BaseEntity {

  @Column({
    name: "is_disabled",
    nullable: false,
    default: false,
  })
  isDisabled: boolean;

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
