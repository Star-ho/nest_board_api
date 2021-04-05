import { Controller, Post, Body } from "@nestjs/common";
import { usersInterface } from "./dto.interface";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  //회원가입
  @Post('signup')
    async create(@Body() signup: usersInterface) {
      if(!("password" in signup)) 
        return JSON.stringify({msg: 'password를 입력해주세요'})
      if(!("id" in signup)) 
        return JSON.stringify({ msg: "id를 입력해주세요" })
      if(!("username" in signup)) 
        return JSON.stringify({ msg: "username를 입력해주세요" })
      const ret = await this.usersService.signup(signup)
      .catch((err)=>{//id로 DB조회 후 존재하는지 여부 파악해서 중복 id 구현가능 하지만 async, await를 사용한 에러처리를 보여주기 위해 이렇게 설계함
        if(err.code=='ER_DUP_ENTRY')
          return JSON.stringify({ msg:"이미 존재하는 아이디 입니다"})
        return JSON.stringify({ msg:"error!"})
      })
      return ret;
  }
}