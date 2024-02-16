import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  check() {
    return this.health.check([
      () =>
        this.microservice.pingCheck('ms-gpio', {
          transport: Transport.TCP,
          options: {
            host: process.env.MS_GPIO_HOST,
            port: process.env.MS_GPIO_PORT,
          },
        }),
    ]);
  }
}
