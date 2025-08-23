import { Controller } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
  constructor(private readonly gateway: NotificationGateway) {}

  @EventPattern('booking-notification') //Redis event name
  handleNotification(@Payload() data: any) {
    this.gateway.broadcast(data); //emit to the frontend via websocket
  }
}
