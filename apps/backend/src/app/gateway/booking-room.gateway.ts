import { BookingRoomService } from '../services';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BookingRoomPaginationParams } from '../controllers/booking-room-pagination.model';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/booking',
})
export class BookingRoomGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger: Logger = new Logger(BookingRoomGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly bookingRoomService: BookingRoomService) {}

  handleConnection(client: Socket, ...args: any[]): any {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  testMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string
  ): WsResponse<string> {
    console.log('concac');
    client.broadcast.emit('msgToServer', message);
    return {
      data: message,
      event: 'msgToClient',
    };
  }

  @SubscribeMessage('findAllRequests')
  async findAllRequest(
    @MessageBody() pagination: BookingRoomPaginationParams,
    @ConnectedSocket() client: Socket
  ) {
    console.log('B SERVICE: ', this.bookingRoomService);
    // const requestSent = await this.bookingRoomService.getAllBookingRoomsPagination(
    //   pagination,
    //   client.id
    // );
    return null;
  }
}
