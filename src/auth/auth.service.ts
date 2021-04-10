import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  //로그인시 users DB에서 username으로 username에 맞는 userpassword 찾고, 찾은 userpassword와 받은 패스워드 비교
  async validateUser(authVal: string);
  async validateUser(authVal: string, pass: string);
  async validateUser(authVal: string, pass?: string): Promise<any> { //authVal는 인증값을 의미, 일반 로그인 시에는 id, google Login시에는 email값이 리턴
    let user = await this.usersService.findOne(authVal);
    if (user  && await bcrypt.compare(pass,user.password)) {
      const { password, ...result } = user;//password 빼고 나머지 리턴
      return result;
    }
    user = await this.usersService.findByEmail(authVal)
    if (user) {
      const { password, ...result } = user;//password 빼고 나머지 리턴
      return result;
    }
    return null;
  };

  //login후 identifedNumber를 페이로드에 넣어줌
  async login(user: any) {
    const payload = { userId : user.identifedNumber };
    return {
      success : true,
      token : 'Bearer '+this.jwtService.sign(payload),
    };
  }

  async googleAuth(user: any) {
    const payload = { userId : user.identifedNumber };
    return {
      success : true,
      token : 'Bearer '+this.jwtService.sign(payload),
    };
  }
}