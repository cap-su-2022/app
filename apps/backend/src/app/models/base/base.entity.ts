import {Column, CreateDateColumn, Entity, UpdateDateColumn} from "typeorm";

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

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;

}
