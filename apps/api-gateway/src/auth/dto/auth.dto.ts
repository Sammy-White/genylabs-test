import { IsEmail, IsIn, Length } from 'class-validator';
import { Roles } from '../../constants/index.constant';

export class CreateUserDto {
  @Length(2, 300)
  firstName: string;

  @Length(2, 300)
  lastName: string;

  @IsEmail()
  email: string;

  @IsIn([...Object.values(Roles)])
  role: string;

  @Length(5, 300)
  password: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @Length(5, 300)
  password: string;
}
