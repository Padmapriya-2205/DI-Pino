import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service.js';
import { CustomersController } from './customers.controller.js';
import { LoggersModule } from '../loggers/loggers.module.js';

@Module({
  imports: [LoggersModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
