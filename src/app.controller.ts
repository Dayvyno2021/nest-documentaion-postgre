import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/AuthGuard/Auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService
    ) {}

  @UseGuards(AuthGuard)
  @Get()
  getHello(@Request() req): string {
    console.log("REQ-USER", req.user);
    console.log("ENV", this.configService.get<string>('PORT'));
    return this.appService.getHello();
  }

}
