import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("booking_request")
export class BookingRequest {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
    comment: "ID of the Booking Request"
  })
  id?: string;

  @Column({
    name: "room_id",
    nullable: false,
  })
  roomId?: string;

  @Column({
    name: "time_checkin",
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timeCheckIn?: Date;

  @Column({
    name: "effdate",
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timeCheckOut?: Date;

  @Column({
    name: "requested_by",
    type: "uuid",
  })
  requestedBy?: string;

  @Column({
    name: "requested_at",
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  requestedAt?: Date;
}
