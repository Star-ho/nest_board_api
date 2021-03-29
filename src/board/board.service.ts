import { Injectable, UnauthorizedException } from '@nestjs/common';
import Board from "../entity/board.entity";
import { boardInterface } from "./dto.interface";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../entity/users.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly board: Repository<Board>
  ) {}

  createBoardFunc(user:any,createBoard: boardInterface) {
    createBoard.createUser=user.userId
    return this.board.create({...createBoard).save();
  }

  listBoard() {
    return this.board.find({ select: ["id","title"], order: { createdAt: -1 } });
  }

  detailBoard(id: number) {
    return this.board.findOne(id);
  }

  async updateBoard(user:any,id: number,updateData:boardInterface) {
    let property= await this.board.findOne(id);
    if(property.createUser!=user.userId){
      throw new UnauthorizedException();
    }
    property.title=updateData.title;
    property.text=updateData.text;
    return this.board.save(property);
  }

  async removeBoard(user:any,id: number) {
    let property= await this.board.findOne(id);
    if(property.createUser!=user.userId){
      throw new UnauthorizedException();
    }
    this.board.delete(id)
    return "success";
  }

}
