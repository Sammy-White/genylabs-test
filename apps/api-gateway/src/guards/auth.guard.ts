import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('USER') private readonly userClient: ClientProxy) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const header = req.headers['authorization'] as string;

    if (!header) throw new UnauthorizedException('missing token!');

    const token = header.split(' ')[1];

    const user = await firstValueFrom(
      this.userClient.send('validate-token', token),
    );

    if (!user) throw new UnauthorizedException('Invalid token!');

    req.user = user;

    return true;
  }
}
