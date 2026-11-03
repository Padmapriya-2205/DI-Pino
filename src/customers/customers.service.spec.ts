import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { LoggersModule } from '../loggers/loggers.module';
import { LoggersService } from '../loggers/loggers.service';

describe('CustomersService', () => {
  let service: CustomersService;
  let loggersService: LoggersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggersModule],
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    loggersService = module.get<LoggersService>(LoggersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('uses the injected logger at every Pino severity level', () => {
    const levels = [
      ['trace', 'Customer trace log'],
      ['debug', 'Customer debug log'],
      ['info', 'Customer info log'],
      ['warn', 'Customer warning log'],
      ['error', 'Customer error log'],
      ['fatal', 'Customer fatal log'],
    ] as const;
    const spies = levels.map(([level]) =>
      vi.spyOn(loggersService.logger, level),
    );

    service.logExample();

    levels.forEach(([, message], index) => {
      expect(spies[index]).toHaveBeenCalledWith(
        { resource: 'customers' },
        message,
      );
    });
    expect(spies[2]).toHaveBeenCalledWith(
      { environment: process.env },
      'Customer environment details (redaction check)',
    );
  });
});
