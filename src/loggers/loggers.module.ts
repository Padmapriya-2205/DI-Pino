import { Module } from '@nestjs/common';
import { LoggersService } from './loggers.service.js';

@Module({
  providers: [LoggersService],
  exports: [LoggersService],
})
export class LoggersModule {}
