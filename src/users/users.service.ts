import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { usersInterface } from "./dto.interface";
import { Repository } from "typeorm";
import { Users } from "../entity/users.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>
  ) {}
  //회원가입 서비스
  async signup(signupUser:usersInterface){
    signupUser.password = await bcrypt.hash(signupUser.password, 10);//비밀번호 암호화
    const { password, ...ret}= await this.users.create(signupUser).save()
    return ret ;
  }
  //조회, 로그인시 사용
  async findOne(id: string): Promise<Users | undefined> {
    return await this.users.findOne({id:id});
  }

}