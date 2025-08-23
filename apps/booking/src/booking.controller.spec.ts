import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entity/booking.entity';

describe('BookingController', () => {
  let bookingController: BookingController;
  let bookingService: BookingService;

  const mockBookingService = {
    create: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [{ provide: BookingService, useValue: mockBookingService }],
    }).compile();

    bookingController = app.get<BookingController>(BookingController);
    bookingService = app.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(bookingController).toBeDefined();
  });

  describe('createBooking', () => {
    it('should call service.createBooking and return created booking', async () => {
      const bookingDto = {
        client_name: 'John Doe',
        client_phone: '+14155552671',
        service: 'Haircut',
        starts_at: '2025-08-21T16:35:16.322Z',
        notes: 'Please be on time',
      };

      const savedBooking: Booking = {
        id: 1,
        ...bookingDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as Booking;
      mockBookingService.create.mockResolvedValue(savedBooking);

      const result = await bookingController.create(bookingDto);

      expect(bookingService.create).toHaveBeenCalledWith(bookingDto);
      expect(result).toEqual(savedBooking);
    });
  });

  describe('FindById', () => {
    it('should return a booking when it exists', async () => {
      const booking: Booking = {
        id: 1,
        client_name: 'John Doe',
        client_phone: '+14155552671',
        service: 'Haircut',
        starts_at: new Date(),
        notes: 'Please be on time',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Booking;

      mockBookingService.findById.mockResolvedValue(booking);

      const result = await bookingController.findById(1);

      expect(bookingService.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(booking);
    });

    it('should return null if booking does not exist', async () => {
      mockBookingService.findById.mockResolvedValue(null);

      const result = await bookingController.findById(99);

      expect(result).toBeNull();
    });
  });
});
