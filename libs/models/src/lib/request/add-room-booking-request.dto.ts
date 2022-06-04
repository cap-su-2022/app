import {ApiProperty} from "@nestjs/swagger";

export class AddRoomBookingRequest{
  @ApiProperty({
    name: 'name',
    description: 'Name of the room to be added',
    maxLength: 100,
    minLength: 1,
    type: String,
    example: 'LB01',
  })
  name?: string;
  @ApiProperty({
    name: 'reason',
    description: 'Reason why has to book this room',
    maxLength: 500,
    minLength: 0,
    type: String,
    example: 'Capstone Project',
  })
  description?: string;

@ApiProperty({
  name: 'user',
  description: 'Name of the user to book this room',
  maxLength: 100,
  minLength: 1,
  type: String,
  example: 'HoaDNT',
})
  user?: string;
}
