import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from "./board.repository"
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository]),AuthModule],//디비와 연결위해
  controllers: [BoardController],//컨트롤러 지정
  providers: [BoardService]//서비스 지정
})
export class BoardModule {}
