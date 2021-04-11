import {
    Injectable,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  
  //google인증모듈 추가로 예외처리 함수 넣어줘야함
  @Injectable()
  export class GoogleAuthGuard extends AuthGuard('google') {}
  