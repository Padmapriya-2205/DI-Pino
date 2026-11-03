import { Injectable } from '@nestjs/common';
import { LoggersService } from '../loggers/loggers.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly loggersService: LoggersService) {}

  logExample(): void {
    const logger = this.loggersService.logger;
    const context = { resource: 'users' };

    logger.trace(context, 'User trace log');
    logger.debug(context, 'User debug log');
    logger.info(context, 'User info log');
    logger.warn(context, 'User warning log');
    logger.error(context, 'User error log');
    logger.fatal(context, 'User fatal log');
    logger.info(
      { environment: process.env.PORT},
      'User environment details (redaction check)',
    );
  }
}
