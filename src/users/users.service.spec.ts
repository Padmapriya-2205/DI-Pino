import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { LoggersModule } from '../loggers/loggers.module';
import { LoggersService } from '../loggers/loggers.service';

describe('UsersService', () => {
  let service: UsersService;
  let loggersService: LoggersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggersModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    loggersService = module.get<LoggersService>(LoggersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('uses the injected logger at every Pino severity level', () => {
    const levels = [
      ['trace', 'User trace log'],
      ['debug', 'User debug log'],
      ['info', 'User info log'],
      ['warn', 'User warning log'],
      ['error', 'User error log'],
      ['fatal', 'User fatal log'],
    ] as const;
    const spies = levels.map(([level]) =>
      vi.spyOn(loggersService.logger, level),
    );

    service.logExample();

    levels.forEach(([, message], index) => {
      expect(spies[index]).toHaveBeenCalledWith({ resource: 'users' }, message);
    });
    expect(spies[2]).toHaveBeenCalledWith(
      { environment: process.env },
      'User environment details (redaction check)',
    );
  });
});
