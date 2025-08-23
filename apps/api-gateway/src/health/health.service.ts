import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';

@Injectable()
export class HealthService {
  async pingService(
    service: ClientProxy,
    name: string,
  ): Promise<HealthIndicatorResult> {
    try {
      await firstValueFrom(
        service.send({ cmd: 'health-check' }, {}).pipe(
          timeout(2000),
          catchError(() => of('unreachable')),
        ),
      );
      return { [name]: { status: 'up' } };
    } catch (e) {
      return { [name]: { status: 'down' } };
    }
  }
}
