import {
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//jwt인증모듈 추가로 예외처리 함수 넣어줘야함
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
