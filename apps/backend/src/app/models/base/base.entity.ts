import {Column, CreateDateColumn, Entity, UpdateDateColumn} from "typeorm";

@Entity()
export abstract class BaseEntity {

  @Column({
    name: "created_by",
    nullable: false,
    default: false,
    type: "uuid"
  })
  createdBy: string;

  @Column({
    name: "updated_by",
    nullable: false,
    default: false,
    type: "uuid"
  })
  updatedBy: string;

  @Column({
    name: "disabled_by",
    nullable: false,
    default: false,
    type: "uuid"
  })
  disabledBy: string;

  @Column({
    name: "deleted_by",
    nullable: false,
    default: false,
    type: "uuid"
  })
  deletedBy: string;

  @Column({
    name: "is_disabled",
    nullable: false,
    default: false
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
