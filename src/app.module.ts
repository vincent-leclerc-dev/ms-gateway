import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_GPIO',
        transport: Transport.TCP,
        options: {
          host: 'ms-gpio',
          port: 3001
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
