import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.USER_HOST,
        port: Number(process.env.USER_PORT),
      },
    },
  );

  await app.listen();

  Logger.log(`User service is running on port ${process.env.USER_PORT}`);
}
bootstrap();
