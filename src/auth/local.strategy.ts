import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField:'id'});
  }

  //유저 확인, user가 없으면 UnauthorizedException에러 뿌림
  async validate(id: string,pass: string): Promise<any> {
    const user = await this.authService.validateUser({id:id, pass:pass});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}