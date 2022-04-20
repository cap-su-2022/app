import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base/base.entity";

@Entity(EquipmentsHistory.name.toLowerCase())
export class EquipmentsHistory extends BaseEntity {

  @PrimaryGeneratedColumn("increment",
    {
      name: "id",
      comment: "ID for Equipment History",
      type: 'bigint',
    })
  equipmentsHistoryId?: number;

  @Column({
    name: "name",
    nullable: false,
    unique: false,
    length: 36,
    type: 'varchar',
    comment: 'Old ID for Equipment',
  })
  id?: string;

  @Column({
    name: "name",
    nullable: false,
    unique: false,
    length: 250,
    type: 'varchar',
    comment: 'Equipments name',
  })
  name?: string;

  @Column({
    name: "description",
    nullable: true,
    unique: false,
    length: 500,
    type: 'varchar',
    comment: 'Equipments description'
  })
  description?: string;

  @Column({
    name: "effdate",
    nullable: true,
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
