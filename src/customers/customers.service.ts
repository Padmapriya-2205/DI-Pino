import { Injectable } from '@nestjs/common';
import { LoggersService } from '../loggers/loggers.service.js';

@Injectable()
export class CustomersService {
  constructor(private readonly loggersService: LoggersService) {}

  logExample(): void {
    const logger = this.loggersService.logger;
    const context = { resource: 'customers' };

    logger.trace(context, 'Customer trace log');
    logger.debug(context, 'Customer debug log');
    logger.info(context, 'Customer info log');
    logger.warn(context, 'Customer warning log');
    logger.error(context, 'Customer error log');
    logger.fatal(context, 'Customer fatal log');
    logger.info(
      { environment: process.env },
      'Customer environment details (redaction check)',
    );
  }
}
