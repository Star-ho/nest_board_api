import {
    Controller,
    Post,
    Body,
    Get,
    Param,
  } from "@nestjs/common";
  import { boardInterface } from "./dto.interface";
  import { BoardService } from "./board.service";
  
  @Controller('board')//컨트롤러 생성
  export class BoardController  {
    constructor(private readonly boardService: BoardService) {}
  
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
  
    @Post("update/:id")
    async update(@Param("id") boardId: number,@Body() updateData: boardInterface) {
      const ret = await this.boardService.updateBoard(boardId,updateData);
      return ret;
    }
  
    @Get("delete/:id")
    async delete(@Param("id") boardId: number) {
      const ret = await this.boardService.removeBoard(boardId);
      return ret;
    }
  }