import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "./user.repository"

@Module({
  imports:[TypeOrmModule.forFeature([UsersRepository])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService,TypeOrmModule.forFeature([UsersRepository])],
})
export class UsersModule {}