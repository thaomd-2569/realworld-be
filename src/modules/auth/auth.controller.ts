import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('verify-token')
  async verifyToken(@Body('token') token: string) {
    return this.authService.verifyToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsImVtYWlsIjoibWFpLmR1b25nLnRoYW9Ac3VuLWFzdGVyaXNrLmNvbSIsImlhdCI6MTc1NTYyMDQ1MSwiZXhwIjoxNzU2MjI1MjUxfQ.Y2mNOXLKNfa2N1EytO9Gufik1iQiSMy-f1voWJbGF5k',
    );
  }

  // @Get('me')
  // async getProfile(@Headers('authorization') authHeader: string) {
  //   if (!authHeader) throw new Error('Missing Authorization header');

  //   const [, token] = authHeader.split(' ');
  //   return this.authService.verifyToken(token);
  // }
}
