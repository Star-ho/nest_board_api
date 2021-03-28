import { Controller, Post, Body } from "@nestjs/common";
import { usersInterface } from "./dto.interface";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Post('signup')
    async create(@Body() signup: usersInterface) {
      const { password, ...ret } = await this.usersService.signup(signup);
      return ret;
    }
  }