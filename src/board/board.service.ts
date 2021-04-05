import { Injectable, UnauthorizedException } from '@nestjs/common';
import Board from "../entity/board.entity";
import { boardInterface } from "./dto.interface";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly board: Repository<Board>
  ) {}

  //게시글 생성
  createBoardFunc(user:any,createBoard: Board) {
    createBoard.user=user.userId
    console.log(createBoard)
    return this.board.create(createBoard).save();
  }

  //전체 게시글 조회
  listBoard() {
    return this.board.find({ select: ["id","title"], order: { createdAt: -1 } });
  }

  //하나의 게시글 조회
  detailBoard(id: number) {
    return this.board.findOne(id);
  }

  //게시글 변경
  async updateBoard(user:any,id: number,updateData:Board) {
    let property= await this.board.findOne({id:id},{relations:["user"]});
    if(property.user.identifedNumber!=user.userId){
      throw new UnauthorizedException();
    }
    property.title=updateData.title;
    property.text=updateData.text;
    let {text,title,...ret}= await this.board.save(property)
    return {text, title} ;
  }

  //게시글 삭제 
  async removeBoard(user:any,id: number) {
    let property= await this.board.findOne({id:id},{relations:["user"]});
    if(property.user.identifedNumber!=user.userId){
      throw new UnauthorizedException();
    }
    this.board.delete(id)
    return "success";
  }

}
