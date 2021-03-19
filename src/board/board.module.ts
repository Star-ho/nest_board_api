import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardRepository } from "./board.repository"
import { Board } from "../entity/board.entity"

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql", 
    "host": "localhost", 
    "port": 3306,
    "username": "root", 
    "password": "boardjs",
    "database": "board",
    "entities": [Board], 
    "logging": true, 
    "synchronize": true 
  }
   ),TypeOrmModule.forFeature([BoardRepository])],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
