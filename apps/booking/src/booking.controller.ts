import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBookingDto } from './dto/booking.dto';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern('create-booking')
  create(@Payload() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @MessagePattern('get-booking')
  findById(@Payload() id: number) {
    return this.bookingService.findById(id);
  }

  @MessagePattern('get-upcoming-bookings')
  findUpcoming(@Payload() query: { page: number; size: number }) {
    const { page, size } = query;
    return this.bookingService.findUpcoming(page, size);
  }

  @MessagePattern('get-past-bookings')
  findPast(@Payload() query: { page: number; size: number }) {
    const { page, size } = query;
    return this.bookingService.findPast(page, size);
  }

  @MessagePattern('health-check')
  healthCheck() {
    return 'ok';
  }
}
