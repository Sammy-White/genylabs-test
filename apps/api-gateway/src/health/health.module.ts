import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { APP_SERVICES } from '../constants/index.constant';

@Module({
  imports: [
    TerminusModule,
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
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
