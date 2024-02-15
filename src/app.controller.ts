import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(@Inject('SERVICE_GPIO') private client: ClientProxy) {}

  @Get('list')
  listGpios(): Observable<string[]> {
    return this.client.send({ cmd: 'listJ8' }, {});
  }

  @Get('activate')
  activateGpio(): Observable<void> {
    return this.client.send(
      { cmd: 'activateGpio' },
      { gpioId: '0', during: '4' },
    );
  }

  @Get('reset')
  resetGpio(): Observable<void> {
    return this.client.send({ cmd: 'resetGpio' }, '0');
  }

  @Get('resetall')
  resetGpios(): Observable<void> {
    return this.client.send({ cmd: 'resetGpios' }, {});
  }
}
