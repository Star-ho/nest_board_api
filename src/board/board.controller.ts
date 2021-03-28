import { Controller, Post, Body, Get, Param, UseGuards,Request } from "@nestjs/common";
  import { boardInterface } from "./dto.interface";
  import { BoardService } from "./board.service";
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';

  @Controller('board')//컨트롤러 생성
  export class BoardController  {
    constructor(private readonly boardService: BoardService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
    async create(@Request() req,@Body() createBoard: boardInterface) {
      const ret = await this.boardService.createBoardFunc(req.user,createBoard);
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
    async update(@Request() req,@Param("id") boardId: number,@Body() updateData: boardInterface) {
      const ret = await this.boardService.updateBoard(req.user,boardId,updateData);
      return ret;
    }
    
    @UseGuards(JwtAuthGuard)
    @Get("delete/:id")
    async delete(@Request() req,@Param("id") boardId: number) {
      const ret = await this.boardService.removeBoard(req.user,boardId);
      return ret;
    }
  }