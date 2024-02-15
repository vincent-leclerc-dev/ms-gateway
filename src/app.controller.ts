import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/')
  index(): { appName: string; appVersion: string; target: string } {
    return {
      appName: this.configService.get<string>('name'),
      appVersion: this.configService.get<string>('version'),
      target: this.configService.get<string>('environment'),
    };
  }
}
