import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { LoggersModule } from '../loggers/loggers.module.js';

@Module({
  imports: [LoggersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
