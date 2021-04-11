import { Controller, Put, Body } from "@nestjs/common";
import { usersInterface } from "./dto.interface";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //회원가입
  @Put('signup')
  async create(@Body() signup: usersInterface) {
    const ret = await this.usersService.signup(signup)
    return ret;
  }
}