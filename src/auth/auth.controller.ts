import { Body, Controller, Post, UseGuards, Get, Request} from '@nestjs/common';
import { User } from '../auth/users.entity';
import { AuthService } from './auth.service';
import { RegisterDto } from './AuthDtos/register.dto';
import { SignInDto } from './AuthDtos/sign-in.dto';
import { AuthGuard } from './AuthGuard/Auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @Post('login')
  signIn(@Body() singInDto: SignInDto): Promise<any>{
    return this.authService.signIn(singInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getRequest(@Request() req){
    console.log(req.user);
    return req.user;
  }

  @Post('register')
  async RegisterUser(
    @Body() registerDto:RegisterDto
  ):Promise<any>{
    return this.authService.RegisterUser(registerDto)
  }
}
