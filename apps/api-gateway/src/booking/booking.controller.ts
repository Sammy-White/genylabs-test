import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/booking.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '../guards/auth.guard';
import { PaginationDto } from './dto/pagination.dto';
import { APP_SERVICES } from '../constants/index.constant';

@UseGuards(AuthGuard)
@Controller('booking')
export class BookingController {
  constructor(
    @Inject(APP_SERVICES.BOOKING) private readonly bookingClient: ClientProxy,
  ) {}

  @Post('create')
  async create(@Body() createBookingDto: CreateBookingDto) {
    return await firstValueFrom(
      this.bookingClient.send('create-booking', createBookingDto),
    );
  }

  @Get('/retrieve/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await firstValueFrom(
      this.bookingClient.send('get-booking', Number(id)),
    );
  }

  @Get('upcoming')
  async findUpcoming(@Query() query: PaginationDto) {
    const { page, size } = query;
    return await firstValueFrom(
      this.bookingClient.send('get-upcoming-bookings', { page, size }),
    );
  }

  @Get('past')
  async findPast(@Query() query: PaginationDto) {
    const { page, size } = query;
    return await firstValueFrom(
      this.bookingClient.send('get-past-bookings', { page, size }),
    );
  }
}
