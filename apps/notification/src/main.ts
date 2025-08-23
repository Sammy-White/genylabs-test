import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.NOTIFICATION_HOST,
        port: Number(process.env.NOTIFICATION_PORT),
      },
    },
  );

  await app.listen();

  Logger.log(
    `Notification service is running on port ${process.env.NOTIFICATION_PORT}`,
  );
}
bootstrap();
