import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base/base.entity";

@Entity("booking_request_hist")
export class BookingRequestHist extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
    comment: "ID of the Booking Request Hist"
  })
  id?: string;

  @PrimaryGeneratedColumn("uuid", {
    name: "id",
    comment: "ID of the Booking Request"
  })
  bookingRequestId?: string;

  @Column({
    name: "room_id",
    nullable: false,
  })
  roomId?: string;

  @Column({
    name: "time_checkin",
    nullable: false,
    type: "timestamptz"
  })
  timeCheckIn?: Date;

  @Column({
    name: "time_checkout",
    nullable: false,
    type: "timestamptz"
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
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP"
  })
  requestedAt?: Date;

  @Column({
    name: "status",
    nullable: false
  })
  status?: string;

  @Column({
    name: "booked_at",
    nullable: false,
    type: "timestamptz"
  })
  bookedAt?: Date;

  @Column({
    name: "checkin_at",
    nullable: false,
    type: "timestamptz"
  })
  checkedInAt?: Date;

  @Column({
    name: "checkout_at",
    nullable: false,
    type: "timestamptz"
  })
  checkedOutAt?: Date;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 500,
  })
  description?: string;
}
