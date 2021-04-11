import { Controller, Req, Request, Get, Post, Header, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { GoogleAuthGuard } from './auth/google-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService, private userService: UsersService) {}

  //로그인
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //로그인 확인을 위한 profile, 로그인 되어 있으면 유저네임 반환
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Header('Cache-Control', 'no-store')
    async getProfile(@Request() req) {
    const user= await this.userService.findUsername(req.user.userId)
    return {"username":user.username};
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/auth/login/google')
  async googleAuth(@Req() req) {}
  
  @UseGuards(GoogleAuthGuard)
  @Get('/auth/login/google/redirect')
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req)
  }
}

