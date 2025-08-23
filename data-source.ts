import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Booking } from './apps/booking/src/entity/booking.entity';
import { User } from './apps/user/src/entity/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Booking], // 'apps/**/src/entity/*.entity.{.ts,.js}', // all services’ entities
  migrations: ['shared/migrations/*{.ts,.js}'],
  ssl: true,
});
