import { FeedbackService } from '../services';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FeedbackSendRequestPayload } from '../payload/request/feedback-send.request.payload';
import { FeedbackPaginationPayload } from '../payload/request/feedback-pagination.payload';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/feedback',
})
export class FeedbackGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly feedbackService: FeedbackService) {}
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendFeedback')
  async addNewFeedback(
    @MessageBody() feedback: FeedbackSendRequestPayload,
    @ConnectedSocket() client: Socket
  ) {
    console.log('RUN HEREEEEEEEEEEEEEEEEEEEEEE');
    const feedbackSent = await this.feedbackService.addNewFeedback(
      client.id,
      feedback
    );

    this.server.emit('feedbackSent', feedbackSent);

    return feedbackSent;
  }

  @SubscribeMessage('findAllFeedbacks')
  async getAllFeedbacks(
    @MessageBody() payload: FeedbackPaginationPayload,
    @ConnectedSocket() client: Socket
  ) {
    // console.log('RUN getAllFeedbacks');
    // console.log('IDDDĐ: ', client.id);
    // console.log('SEVICE: ', this.feedbackService);
    // const result = await this.feedbackService.getAllFeedbacks(
    //   client.id,
    //   payload
    // );
    // console.log('RESULT: ', result);
    // return result;
    return null;
  }
}
