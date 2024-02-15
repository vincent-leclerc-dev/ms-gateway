import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        if (configService.get('environment') === 'development') {
          return {
            pinoHttp: {
              transport: {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  levelFirst: true,
                  singleLine: true,
                },
              },
            },
          };
        } else {
          return {
            pinoHttp: {},
          };
        }
      },
    }),
    ClientsModule.register([
      {
        name: 'SERVICE_GPIO',
        transport: Transport.TCP,
        options: {
          host: 'ms-gpio',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
