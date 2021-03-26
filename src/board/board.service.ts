import { Injectable } from '@nestjs/common';
import Board from "../entity/board.entity";
import { boardInterface } from "./dto.interface";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly board: Repository<Board>
  ) {}

  createBoardFunc(createBoard: boardInterface) {
    return this.board.create(createBoard).save();
  }

  listBoard() {
    return this.board.find({ select: ["id","title"], order: { createdAt: -1 } });
  }

  detailBoard(id: number) {
    return this.board.findOne(id);
  }

  async updateBoard(id: number,updateData:boardInterface) {
    let property= await this.board.findOne(id);
    property.title=updateData.title;
    property.text=updateData.text;
    return this.board.save(property);
    
  }

  removeBoard(id: number) {
    return this.board.delete(id);
  }

}
