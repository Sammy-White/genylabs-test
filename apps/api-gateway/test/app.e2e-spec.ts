import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/guards/auth.guard';
import { of } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockBookingResponse = {
    id: 1,
    client_name: 'John Doe',
    client_phone: '+14155552671',
    service: 'HAIRCUT',
    starts_at: '2025-08-21T09:55:15.322Z',
    notes: 'Need a haircut',
    createdAt: '2025-08-21T08:31:15.068Z',
    updatedAt: '2025-08-21T08:31:15.068Z',
  };

  //mocking the microservice client to return an Observable
  const mockBookingClient = {
    send: jest.fn(() => of(mockBookingResponse)),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) //Allow all request
      .overrideProvider('BOOKING')
      .useValue(mockBookingClient)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/booking/create (POST) → create booking', () => {
    const bookingDto = {
      client_name: 'John Doe',
      client_phone: '+14155552671',
      service: 'HAIRCUT',
      starts_at: '2025-08-21T09:55:15.322Z',
      notes: 'Need a haircut',
    };

    return request(app.getHttpServer())
      .post('/booking/create')
      .send(bookingDto)
      .expect(201)
      .expect(mockBookingResponse);
  });

  afterAll(async () => {
    await app.close();
  });
});
