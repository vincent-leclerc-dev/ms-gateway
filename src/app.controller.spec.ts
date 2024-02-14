import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [

      ],
      imports: [
        ClientsModule.register([
          {
            name: 'SERVICE_GPIO',
            transport: Transport.TCP,
            options: {
              host: 'localhost',
              port: 3001
            }
          }
        ])
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return [\'GPIO0\']', async () => {
      const input = ['GPIO0'];
      const input$ = of(input);

      jest.spyOn(appController, 'listGpios').mockImplementation(() => input$);

      const output$ = appController.listGpios();
      const output = await firstValueFrom(output$);

      expect(output).toBe(input);
    });
  });
});
