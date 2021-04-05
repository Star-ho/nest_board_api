import { Controller, Req, Request, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Response as Res } from 'express';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(@Req() request: Request): string {
    return this.appService.toBoardService();//toBoardService 호출
  }
  //로그인
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Get('/login')
  async loginPage(@Request() req) {
    return this.appService.tologinPage();//로그인페이지 호출
  }
  @Get('/signup')
  async signupPage(@Request() req) {
    return this.appService.toSignUp();//회원가입 페이지
  }
  //로그인 확인을 위한 profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

