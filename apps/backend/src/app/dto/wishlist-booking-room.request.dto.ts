import { ApiProperty } from "@nestjs/swagger";

export class WishlistBookingRoomRequestDTO {
  @ApiProperty({
    name: "roomId",
    type: String,
    description: "Id of the requested booking library room",
    example: "LB01",
    title: "Room ID",
    required: true
  })
  roomId: string;
  @ApiProperty({
    name: "slot",
    type: Number,
    description: "Requested booking room slot",
    example: 1,
    title: "Slot",
    required: true
  })
  slot: number;
}
