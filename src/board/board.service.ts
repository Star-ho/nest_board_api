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
    return `<html>
    <head>
    <title>게시판</title>
    <script src="//code.jquery.com/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="/main.css">
    <style> 
     .title{
      width:400px;height:40px;font-size:15px;
      margin:10 0 10;

     }
     .text{
      width:500px;height:300px;font-size:15px;
      margin:10 0;

     }
     h2{
      font-size:30px;
      margin:10 0 20;

     }
    </style>
    </head>
    <body>
    <div id='login_wrapper' >
    <div class='login' style='width:500px; margin:20px'>
      <div style='width:100px; float:left;'>
        <h2 class='h2'>제목</h2>
      </div>
      <div style='width:300px;  float:left;'>
        <input type="text" id="title"  class='title' placeholder="제목을 입력해 주세요" />
      </div>
        <textarea id="text"  class="text" placeholder="내용을 입력해 주세요" style='resize: none;' /></textarea>
    </div>
    <div class='btn_group' stlye='width:500px;'>
      <button type="button" style='width: 110;' id='logout' onClick="createBoard()" class='button' >글쓰기</button>
      <button type="button" style='width: 60;' id='logout' onclick="location.href='/'" class='button' >취소</button>
    </div>
    </div>
    </body>
    <script>
    function createBoard(){
      let title = document.getElementById("title").value;
      let text = document.getElementById("text").value;
      if( title ==''){
        alert("제목을 입력해 주세요");
        return;
      }
      if( text ==''){
        alert("내용을 입력해 주세요");
        return;
      }
      fetch("/board/create",{
          method : "Put",
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
    return await this.board.find({ select: ["id","title","createdAt"], order: { createdAt: -1 },take: 6  });
  }

  //하나의 게시글 조회
  async detailBoard(id: number) {
    const contents =  await this.board.findOne({id:id},{relations:["user"]});
    const date=new Date(contents.createdAt);
    let ret=` 
    <html>
    <head>
    <title>수정</title>
    <script src="//code.jquery.com/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="/main.css">
    <style> 
     .title{
      width:400px;height:40px;font-size:15px;
      margin:10 0 10;

     }
     .text{
      width:500px;height:300px;font-size:15px;
      margin:10 0;

     }
     h2{
      font-size:30px;
      margin:10 0 20;

     }
    </style>
    </head>
    <body>
    <div id='login_wrapper' >
    <div class='btn_group' style='width:500px;'>
      <button type="button" style='width: 60' onClick="toUpdatePage()" class='button' >수정</button>
      <button type="button" style='width: 60' onclick="deletePage()" class='button' >삭제</button>
      <button type="button" style='width: 80' onclick="location.href='/'" class='button' >홈으로</button>
    </div>
    <div class='login' style='width:500px; margin:20px'>
      <div style='width:300; margin: 0 0 10'>
        <h2 class='h2'>${contents.title}</h2>
      </div>
      <div style='width:500px;height:300;' >
        <p style='font-size:17; margin:1'>${contents.text}<p>
      </div>
    </div>

    </div>
    </body>
    
    <script>
    function deletePage(){
      fetch("/board/delete/${contents.id}",{
        method : "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : sessionStorage.getItem('token')
        }
      })
    .then(function (res){
      console.log(res)
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
    return `
    <html>
    <head>
    <title>수정</title>
    <script src="//code.jquery.com/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="/main.css">
    <style> 
     .title{
      width:400px;height:40px;font-size:15px;
      margin:10 0 10;

     }
     .text{
      width:500px;height:300px;font-size:15px;
      margin:10 0;

     }
     h2{
      font-size:30px;
      margin:10 0 20;

     }
    </style>
    </head>
    <body>
    <div id='login_wrapper' >
    <div class='login' style='width:500px; margin:20px'>
      <div style='width:100px; float:left;'>
        <h2 class='h2'>제목</h2>
      </div>
      <div style='width:300px;  float:left;'>
        <input type="text" id="title"  class='title' value="${contents.title}" />
      </div>
        <textarea id="text"  class="text" style='resize: none;' />${contents.text}</textarea>
    </div>
    <div class='btn_group' stlye='width:500px;'>
      <button type="button" style='width: 110;' id='logout' onClick="updateBoard()" class='button' >글쓰기</button>
      <button type="button" style='width: 60;' id='logout' onclick="location.href='/'" class='button' >취소</button>
    </div>
    </div>
    </body>
    
    <script>
    function updateBoard(){
      let title = document.getElementById("title").value;
      let text = document.getElementById("text").value;
      if( title ==''){
        alert("제목을 입력해 주세요");
        return;
      }
      if( text ==''){
        alert("내용을 입력해 주세요");
        return;
      }
      fetch("/board/update/${contents.id}",{
          method : "PATCH",
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
