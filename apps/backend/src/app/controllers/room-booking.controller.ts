import {Controller, HttpStatus, Post} from '@nestjs/common';
import {AddRoomBookingRequest} from '@app/models';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@Controller('/v1/room-booking')
@ApiBearerAuth()
@ApiTags('Room Booking')
export class RoomBookingController {
  constructor() {
    return;
  }
  @ApiOperation({
    description: 'Room Booking',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully booked a new library room',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for room booking is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Invalid role',
  })
  @Post('add')
  @ApiBody({
    type: AddRoomBookingRequest,
})
  requestRoomBooking() {
    return;
  }
}
