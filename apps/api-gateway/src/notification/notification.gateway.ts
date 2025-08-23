import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: '*',
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  broadcast(message: any) {
    this.server.emit('booking-notification', message);
  }
}
