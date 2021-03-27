import { Controller, Post, Body, Get, Param, UseGuards } from "@nestjs/common";
  import { boardInterface } from "./dto.interface";
  import { BoardService } from "./board.service";
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';

  @Controller('board')//컨트롤러 생성
  export class BoardController  {
    constructor(private readonly boardService: BoardService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
    async create(@Body() createBoard: boardInterface) {
      console.log(createBoard)
      const ret = await this.boardService.createBoardFunc(createBoard);
      return ret;
    }
  
    @Get()
    async list() {
      const ret = await this.boardService.listBoard();
      return ret;
    }
  
    @Get(":id")
    async detail(@Param("id") boardId: number) {
      const ret = await this.boardService.detailBoard(boardId);
      return ret;
    }

    @UseGuards(JwtAuthGuard)
    @Post("update/:id")
    async update(@Param("id") boardId: number,@Body() updateData: boardInterface) {
      const ret = await this.boardService.updateBoard(boardId,updateData);
      return ret;
    }
    @UseGuards(JwtAuthGuard)
    @Get("delete/:id")
    async delete(@Param("id") boardId: number) {
      const ret = await this.boardService.removeBoard(boardId);
      return ret;
    }
  }