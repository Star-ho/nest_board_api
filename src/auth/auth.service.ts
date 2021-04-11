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

  //인자 여부에 따라 비교, id가 존재하면 일반로그인이므로 id와 pass비교, email존재시 OAuth이므로 이메일만 비교
  async validateUser({id=undefined, pass=undefined,email=undefined}): Promise<any> { 
    if(id){
      let user = await this.usersService.findOne(id);
      if (user  && await bcrypt.compare(pass,user.password)) {
        const { password, ...result } = user;//password 빼고 나머지 리턴
        return result;
      }
    }else if(email){
      let user = await this.usersService.findByEmail(email)
      if (user) {
        const { password, ...result } = user;//password 빼고 나머지 리턴
        return result;
      }
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

}