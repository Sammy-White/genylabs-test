import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Counter, Registry } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry: Registry;
  private readonly requestCounter: Counter;

  constructor() {
    this.registry = new Registry();

    //collect Node.js process metrics
    collectDefaultMetrics({ register: this.registry });

    //define counter only once
    this.requestCounter = new Counter({
      name: 'api_gateway_requests_total',
      help: 'Total number of requests to the API gateway',
      labelNames: ['method', 'path', 'status'],
      registers: [this.registry],
    });
  }

  incrementRequestCount(method: string, path: string, status: string) {
    this.requestCounter.inc({ method, path, status });
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}
