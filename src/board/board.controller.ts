import { Controller, Post, Body, Get, Param, UseGuards,Request } from "@nestjs/common";
import Board from "../entity/board.entity";
  import { BoardService } from "./board.service";
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { boardInterface } from "./dto.interface";

  @Controller('board')//컨트롤러 생성
  export class BoardController  {
    constructor(private readonly boardService: BoardService) {}
  
  //게시글 생성
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req,@Body() createBoard: Board) {
    const ret = await this.boardService.createBoardFunc(req.user,createBoard);
    return ret;
  }

  //전체 게시글 조회
  @Get()
  async list() {
    const ret = await this.boardService.listBoard();
    return ret;
  }

  //id에 해당하는 게시글 조회
  @Get(":id")
  async detail(@Param("id") boardId: number) {
    const ret = await this.boardService.detailBoard(boardId);
    return ret;
  }

  //id에 해당하는 게시글 업데이트, jwt로 인증하여 IdentificationNuber가 같아야 변경가능
  @UseGuards(JwtAuthGuard)
  @Post("update/:id")
  async update(@Request() req,@Param("id") boardId: number,@Body() updateData: Board) {
    const ret = await this.boardService.updateBoard(req.user,boardId,updateData);
    return ret;
  }
  
  //id에 해당하는 게시글 삭제, jwt로 인증하여 IdentificationNuber가 같아야 삭제
  @UseGuards(JwtAuthGuard)
  @Get("delete/:id")
  async delete(@Request() req,@Param("id") boardId: number) {
    const ret = await this.boardService.removeBoard(req.user,boardId);
    return ret;
  }
}