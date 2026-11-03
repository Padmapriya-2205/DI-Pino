import { Test, TestingModule } from '@nestjs/testing';
import { LoggersService } from './loggers.service';

describe('LoggersService', () => {
  let service: LoggersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggersService],
    }).compile();

    service = module.get<LoggersService>(LoggersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('exposes all Pino log levels', () => {
    expect(service.logger.trace).toBeTypeOf('function');
    expect(service.logger.debug).toBeTypeOf('function');
    expect(service.logger.info).toBeTypeOf('function');
    expect(service.logger.warn).toBeTypeOf('function');
    expect(service.logger.error).toBeTypeOf('function');
    expect(service.logger.fatal).toBeTypeOf('function');
  });
});
