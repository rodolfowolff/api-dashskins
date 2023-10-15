import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { seconds, Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller()
@UseGuards(ThrottlerGuard)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Throttle({ short: { limit: 3, ttl: seconds(1) } })
  getHello(): string {
    return this.appService.getHello();
  }
}
