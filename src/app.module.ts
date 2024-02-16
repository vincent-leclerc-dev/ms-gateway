import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { config } from './config/config';
import { GpioController } from './gpio.controller';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    HealthModule,
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
              level: configService.get('logLevel'),
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
            pinoHttp: {
              level: configService.get('logLevel'),
            },
          };
        }
      },
    }),
    ClientsModule.register([
      {
        name: 'SERVICE_GPIO',
        transport: Transport.TCP,
        options: {
          host: process.env.MS_GPIO_HOST,
          port: parseInt(process.env.MS_GPIO_PORT, 10),
        },
      },
    ]),
  ],
  controllers: [AppController, GpioController],
  providers: [],
})
export class AppModule {}
