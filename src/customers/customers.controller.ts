import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service.js';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  logExample() {
    this.customersService.logExample();
    return { message: 'Customer logger example written' };
  }
}
