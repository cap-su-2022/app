import { BookingRoomService } from '../services';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { BookingRequestAddRequestPayload } from '../payload/request/booking-request-add.payload';
import { User } from '../decorators/keycloak-user.decorator';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import {Server} from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class BookingRoomGateway {
    @WebSocketServer()
    server: Server
  constructor(private readonly bookingRoomService: BookingRoomService) {}

  @SubscribeMessage('new-request')
  async addNewRequest(
    @User() user: KeycloakUserInstance,
    @MessageBody() request: BookingRequestAddRequestPayload
  ) {
    const requestSent = await this.bookingRoomService.addNewRequest(request, user.account_id);

    this.server.emit('new-request', requestSent)

    console.log("RUN HEREEEEEEEEEEEEEEEEEEEEEE")
    return requestSent
  }
}
