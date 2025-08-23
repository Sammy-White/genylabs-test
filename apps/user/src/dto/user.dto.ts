export class CreateUserDto {
  firstName: string;

  lastName: string;

  email: string;

  role: string;

  password: string;
}

export class LoginUserDto {
  email: string;

  password: string;
}
