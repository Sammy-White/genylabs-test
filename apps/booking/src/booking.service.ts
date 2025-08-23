import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entity/booking.entity';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { CreateBookingDto } from './dto/booking.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectQueue('bookings') private readonly queue: Queue,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingRepository.create(createBookingDto);
    const saved = await this.bookingRepository.save(booking);
    await this.queue.add('booking.created', saved, {
      delay: 600000, //delay for 10mins  600000
      attempts: 3,
      removeOnComplete: true,
    });
    return saved;
  }

  async findById(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOneBy({ id });

    if (!booking) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found!',
      });
    }

    return booking;
  }

  async findUpcoming(page: number, size: number) {
    const now = new Date();
    const [data, total] = await this.bookingRepository.findAndCount({
      where: {
        startsAt: MoreThan(now),
      },
      skip: (page - 1) * size,
      take: size,
      order: { createdAt: 'ASC' },
    });

    const totalPages = Math.ceil(total / size);

    return {
      meta: {
        total,
        page,
        size,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
      data,
    };
  }

  async findPast(page: number, size: number) {
    const now = new Date();
    const [data, total] = await this.bookingRepository.findAndCount({
      where: {
        startsAt: LessThanOrEqual(now),
      },
      skip: (page - 1) * size,
      take: size,
      order: { createdAt: 'ASC' },
    });

    const totalPages = Math.ceil(total / size);

    return {
      meta: {
        total,
        page,
        size,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
      data,
    };
  }
}
