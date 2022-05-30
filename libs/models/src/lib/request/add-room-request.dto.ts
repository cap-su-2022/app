import { ApiProperty } from '@nestjs/swagger';

export class AddRoomRequest {
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
    name: 'description',
    description: 'Description of the room to be added',
    maxLength: 500,
    minLength: 0,
    type: String,
    example: 'New library room',
  })
  description?: string;

  @ApiProperty({
    name: 'isActivated',
    description: 'Is the room should be active',
    type: Boolean,
    example: true,
  })
  isActivated?: boolean;
}
