import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { BookingController } from './booking/booking.controller';
import { NotificationController } from './notification/notification.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationGateway } from './notification/notification.gateway';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { APP_SERVICES } from './constants/index.constant';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ClientsModule.register([
      {
        name: APP_SERVICES.USER,
        transport: Transport.TCP,
        options: {
          host: process.env.USER_HOST,
          port: Number(process.env.USER_PORT),
        },
      },
      {
        name: APP_SERVICES.BOOKING,
        transport: Transport.TCP,
        options: {
          host: process.env.BOOKING_HOST,
          port: Number(process.env.BOOKING_PORT),
        },
      },
    ]),
    HealthModule,
    MetricsModule,
  ],
  controllers: [
    AppController,
    AuthController,
    BookingController,
    NotificationController,
  ],
  providers: [AppService, NotificationGateway],
})
export class AppModule {}
