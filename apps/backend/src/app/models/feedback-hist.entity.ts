import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('feedback_hist')
export class FeedbackHist {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id?: string;

  @Column({
    name: 'feedback_id',
    type: 'uuid',
  })
  feedbackId?: string;

  @Column({
    name: 'feedback_msg',
    type: 'varchar',
    length: 500,
  })
  feedbackMessage?: string;

  @Column({
    name: 'feedback_type_id',
    type: 'uuid',
  })
  feedbackTypeId?: string;

  @Column({
    name: 'resolved_msg',
    type: 'varchar',
    length: 500,
  })
  resolvedMessage?: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 100,
  })
  status?: string;

  @Column({
    name: 'resolved_by',
    type: 'uuid',
  })
  resolvedBy?: string;

  @Column({
    name: 'resolved_at',
    type: 'timestamptz',
  })
  resolvedAt?: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt?: Date;

  @Column({
    name: 'created_by',
    type: 'uuid',
  })
  createdBy?: string;

  @Column({
    name: 'deleted_at',
    type: 'timestamptz',
  })
  deletedAt?: Date;

  @Column({
    name: 'deleted_by',
    type: 'uuid',
  })
  deletedBy?: string;
}
