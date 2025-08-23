import { Controller, Get, Inject } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ClientProxy } from '@nestjs/microservices';
import { APP_SERVICES } from '../constants/index.constant';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private health: HealthCheckService,
    @Inject(APP_SERVICES.BOOKING) private BookingClient: ClientProxy,
    @Inject(APP_SERVICES.USER) private UserClient: ClientProxy,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const [bookingHealth, userHealth] = await Promise.all([
      this.healthService.pingService(this.BookingClient, 'Booking_Service'),
      this.healthService.pingService(this.UserClient, 'User_Service'),
    ]);

    return this.health.check([
      async () => bookingHealth,
      async () => userHealth,
    ]);
  }
}
