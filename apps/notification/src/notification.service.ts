import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Job } from 'bullmq';

@Injectable()
@Processor('bookings')
export class NotificationService extends WorkerHost {
  private client: ClientProxy;

  constructor() {
    super();

    // Connect to Redis microservice (API Gateway)
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
  }

  async process(job: Job<any, any, string>) {
    if (job.name === 'booking.created') {
      //TODO: save notification to DB before emit

      //Broadcast via redis to api gateway
      this.client.emit('booking-notification', job.data);
    }
  }
}
