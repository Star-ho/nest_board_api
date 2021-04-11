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
    if(!("password" in signupUser)) 
    return JSON.stringify({msg: 'password를 입력해주세요'})
    if(!("id" in signupUser)) 
      return JSON.stringify({ msg: "id를 입력해주세요" })
    if(!("username" in signupUser)) 
      return JSON.stringify({ msg: "username를 입력해주세요" })
    console.log(signupUser.id)
    if(await this.findOne(signupUser.id))
      return JSON.stringify({ msg: "id 가 중복됩니다." })
    if(await this.findByUsername(signupUser.username))
      return JSON.stringify({ msg: "username이 중복됩니다." })
    if(await this.findByEmail(signupUser.email))
      return JSON.stringify({ msg: "email이 중복됩니다." })
  
    signupUser.password = await bcrypt.hash(signupUser.password, 10);//비밀번호 암호화
    const { password, ...ret}= await this.users.create(signupUser).save()
    return ret ;
  }
  //조회, 로그인시 사용
  async findOne(id: string): Promise<Users | undefined> {
    return await this.users.findOne({id:id});
  }
  async findByUsername(username: string): Promise<Users | undefined> {
    return await this.users.findOne({username:username});
  }
  async findByEmail(email: string): Promise<Users | undefined> {
    return await this.users.findOne({email:email});
  }
  async findUsername(id: string): Promise<Users | undefined> {
    return await this.users.findOne({identifedNumber:parseInt(id)});
  }
}