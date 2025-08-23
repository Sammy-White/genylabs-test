import { Controller, Get, Req } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Request } from 'express';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async metrics(@Req() req: Request): Promise<string> {
    //increment per request
    this.metricsService.incrementRequestCount(req.method, req.path, '200');
    return this.metricsService.getMetrics();
  }
}
