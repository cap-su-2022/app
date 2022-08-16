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

  @SubscribeMessage('sendRequestForSelf')
  async sendRequestForSelf(
    @MessageBody() bookedFor: string,
    @ConnectedSocket() client: Socket
  ) {
    client.broadcast.emit('sendRequestForSelf', bookedFor);
    return {
      data: bookedFor,
      event: 'sendRequestForSelf',
    };
  }

  @SubscribeMessage('sendRequestForOther')
  async sendRequestForOther(
    @MessageBody() bookedFor: string,
    @ConnectedSocket() client: Socket
  ) {
    client.broadcast.emit('sendRequestForOther', bookedFor);
    return {
      data: bookedFor,
      event: 'sendRequestForOther',
    };
  }

  @SubscribeMessage('acceptRequest')
  async acceptRequest(
    @MessageBody() bookedFor: string,
    @ConnectedSocket() client: Socket
  ) {
    client.broadcast.emit('acceptRequest', bookedFor);
    return {
      data: bookedFor,
      event: 'acceptRequest',
    };
  }

  @SubscribeMessage('cancelRequest')
  async cancelRequest(
    @MessageBody() payload: {cancelledBy: string, bookedFor: string},
    @ConnectedSocket() client: Socket
  ) {
    client.broadcast.emit('cancelRequest', payload);
    return {
      data: payload,
      event: 'cancelRequest',
    };
  }

  @SubscribeMessage('rejectRequest')
  async rejectRequest(
    @MessageBody() bookedFor: string,
    @ConnectedSocket() client: Socket
  ) {
    client.broadcast.emit('rejectRequest', bookedFor);
    return {
      data: bookedFor,
      event: 'rejectRequest',
    };
  }
}
