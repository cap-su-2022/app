import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base/base.entity";

@Entity(Devices.name.toLowerCase())
export class Devices extends BaseEntity {

  @PrimaryGeneratedColumn("uuid",
    {
      name: "id",
      comment: "ID for Equipments",
    },)
  id?: string;

  @Column({
    name: "name",
    nullable: false,
    unique: true,
    length: 250,
    type: 'varchar',
    comment: `Equipment's name`,
  })
  name?: string;

  @Column({
    name: "description",
    nullable: false,
    unique: false,
    length: 500,
    type: 'varchar',
    comment: 'Equipments description'
  })
  description?: string;

  @Column({
    name: "effdate",
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  effDate: Date;

  @Column({
    name: "inactive_date",
    nullable: true,
    type: 'timestamp',
  })
  inactiveDate: Date;
}
