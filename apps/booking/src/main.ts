import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.BOOKING_HOST,
        port: Number(process.env.BOOKING_PORT),
      },
    },
  );

  await app.listen();

  Logger.log(`Booking service is running on port ${process.env.BOOKING_PORT}`);
}
bootstrap();
