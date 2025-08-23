import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { firstValueFrom } from 'rxjs';
import { APP_SERVICES } from '../constants/index.constant';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(APP_SERVICES.USER) private readonly userClient: ClientProxy,
  ) {}

  @Post('register-user')
  async register(@Body() createUserDto: CreateUserDto) {
    return await firstValueFrom(
      this.userClient.send('create-user', createUserDto),
    );
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await firstValueFrom(
      this.userClient.send('login-user', loginUserDto),
    );
  }
}
