import { BookingRoomService } from '../services';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BookingRoomPaginationParams } from '../controllers/booking-room-pagination.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BookingRoomGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly bookingRoomService: BookingRoomService) {}

  @SubscribeMessage('findAllRequests')
  async findAllRequest(
    @MessageBody() pagination: BookingRoomPaginationParams,
    @ConnectedSocket() client: Socket
  ) {
    console.log("B SERVICE: ", this.bookingRoomService)
    // const requestSent = await this.bookingRoomService.getAllBookingRoomsPagination(
    //   pagination,
    //   client.id
    // );
    return null;
  }
}
