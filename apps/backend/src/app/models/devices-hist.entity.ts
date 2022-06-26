import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, BaseEntityWithDisabled } from './base/base.entity';

@Entity(DevicesHist.name.toLowerCase())
export class DevicesHist extends BaseEntityWithDisabled {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    comment: 'ID for Equipment History',
    type: 'bigint',
  })
  equipmentsHistoryId?: number;

  @Column({
    name: 'name',
    nullable: false,
    unique: false,
    length: 36,
    type: 'varchar',
    comment: 'Old ID for Equipment',
  })
  id?: string;

  @Column({
    name"name"e',
    nullable: false,
    unique: false,
    length: 250,
    type"varchar"r',
    comment"Equipments name"',
  })
  name?: string;

  @Column({
    name: "description",
    nullable: true,
    unique: false,
    length: 500,
    type: "varchar",
    comment: "Equipments description"
  })
  description?: string;

  @Column({
    name: "effdate",
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  effDate: Date;

  @Column({
    name: "inactive_date",
    nullable: true,
    type: "timestamp"
  })
  inactiveDate: Date;
}
