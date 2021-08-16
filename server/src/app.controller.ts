import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/check-prime')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  isPrime(@Param() params): Record<'result', boolean> {
    const result = this.appService.isPrime(params.id);
    return { result };
  }
}
