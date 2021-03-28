import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { usersInterface } from "./dto.interface";
import { Repository } from "typeorm";
import { Users } from "../entity/users.entity";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>
  ) {}
  signup(signupUser:usersInterface){
    return this.users.create(signupUser).save();
  }

  async findOne(id: string): Promise<Users | undefined> {
    return await this.users.findOne({id:id});
  }
}