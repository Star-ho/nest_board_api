import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //jwt를 Auth헤더에서 토큰 추출
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //토큰에 있는 userId리턴
  async validate(payload: any) {
    return { userId: payload.userId };
  }
}