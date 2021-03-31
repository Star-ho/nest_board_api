import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//요청받은 jwt를 어떻게 처리할것인가
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //토큰에 있는 userId리턴
  async validate(payload: any) {
    console.log(payload)
    return { userId: payload.userId };
  }
}