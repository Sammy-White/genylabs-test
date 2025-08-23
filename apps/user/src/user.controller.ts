import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('create-user')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('login-user')
  login(@Payload() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @MessagePattern('validate-token')
  validateToken(@Payload() token: string) {
    return this.userService.validateToken(token);
  }

  @MessagePattern('health-check')
  healthCheck() {
    return 'ok';
  }
}
