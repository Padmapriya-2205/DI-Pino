import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { LoggersModule } from '../loggers/loggers.module';

describe('CustomersController', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggersModule],
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
