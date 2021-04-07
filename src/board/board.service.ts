import { Injectable, UnauthorizedException } from '@nestjs/common';
import Board from "../entity/board.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly board: Repository<Board>
  ) {}

  createboard() {
    return `<html><head>
    <title>글쓰기</title>
    </head>
    <body>
    <input type="text" placeholder="제목" id="title" />
    <input type="text" placeholder="내용" id="text" />
    <input type="button" onclick="createBoard()" id="submit" value="생성" />
    <script>
    function createBoard(){
      let title = document.getElementById("title").value;
      let text = document.getElementById("text").value;
      fetch("/board/create",{
          method : "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : sessionStorage.getItem("token")
          },
          body:JSON.stringify({
          "title":title,
          "text":text
      }),
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      if(res.id){
        alert("게시글이 작성되었습니다")
        location.href='/'
        }
      })
    }
    </script>
   </body></html>
    `
  }
  //게시글 생성
  createBoardFunc(user:any,createBoard: Board) {
    createBoard.user=user.userId
    return this.board.create(createBoard).save();
  }

    
  //전체 게시글 조회
  async listBoard() {
    return await this.board.find({ select: ["id","title","createdAt"], order: { createdAt: 1 } });
  }

  //하나의 게시글 조회
  async detailBoard(id: number) {
    const contents =  await this.board.findOne({id:id},{relations:["user"]});
    const date=new Date(contents.createdAt);
    let ret=` <html><head>
    <title>글쓰기</title>
    </head>
    <body>
    <a href="#" onClick="toUpdatePage()">수정</a>
              <a href="#" onClick="deletePage()" >삭제</a>
              <a href="javascript:history.back()">뒤로가기</a><br><br>
    제목 : ${contents.title} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 작성일 ${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}<br><br><br>
    내용 : ${contents.text}
    <script>
    function deletePage(){
      fetch("/board/delete/${contents.id}",{
        method : "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : sessionStorage.getItem('token')
        }
      })
    .then(function (res){
      if(res.status==200){
        alert("삭제 성공")
        location.href='/';
      }else{
      alert("작성자만 삭제 가능합니다")
    }
    })
  }
    function toUpdatePage(){
      fetch("/profile",{
        method : "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : sessionStorage.getItem('token')
        }
        })
      .then(res=>res.json())
      .then(function (res){
          if(res.username=="${contents.user.username}"){
          location.href='/board/update/${contents.id}';
        }else{
          alert("작성자만 수정 가능합니다")
        }
    })
  }
    </script>
    </body>
    </html>
    `
    return ret;
  }


  async updateBoardPage(id:number) {
    const contents = await this.board.findOne({id:id});
    return `<html><head>
    <title>글쓰기</title>
    </head><body>
    <input type="text" value="${contents.title}" id="title" />
    <input type="text" value="${contents.text}" id="text" />
    <input type="button" onclick="updateBoard()" id="submit" value="수정" />
    <script>
    function updateBoard(){
      let title = document.getElementById("title").value;
      let text = document.getElementById("text").value;
      fetch("/board/update/${contents.id}",{
          method : "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : sessionStorage.getItem("token")
          },
          body:JSON.stringify({
          "title":title,
          "text":text
      }),
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      if(res.text){
        alert("게시글이 수정되었습니다");
        location.href='/';
        }else{
          alert("게시글은 작성자만 수정이 가능합니다");
          location.href='/';

        }
      })
    }
    </script>
   </body></html>
    `
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
