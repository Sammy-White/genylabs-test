import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exists = await this.userRepository.existsBy({
      email: createUserDto.email,
    });

    if (exists) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Email already exists!',
      });
    }

    const user = this.userRepository.create(createUserDto);
    const saved = await this.userRepository.save(user);
    delete saved.password;
    return saved;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user || !(await user.validatePassword(password))) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials!',
      });
    }

    delete user.password;

    const { id, firstName, lastName, role } = user;

    const payload = { id, firstName, lastName, email };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async validateToken(token: string) {
    return this.jwtService.verify(token);
  }
}
