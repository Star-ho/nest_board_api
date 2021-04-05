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
    return `<html><body>
    <input type="text" placeholder="제목" id="title" />
    <input type="password" placeholder="내용" className="password_input" id="text" />
    <input type="button" onclick="createBoard()" id="submit" value="생성" />
    <script>
    function createBoard(){
      let title = document.getElementById("title").value;
      let text = document.getElementById("text").value;
      fetch("/board/create",{
          method : "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("token")
          },
          body:JSON.stringify({
          "title":title,
          "text":text
      }),
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      if(res.success){
        localStorage.setItem("token",res.token)
        alert("로그인성공")
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
    const lists= await this.board.find({ select: ["id","title"], order: { createdAt: -1 } });
    let ret=`<a href="/board/create">글쓰기</a><br><br>
    <script>
    function deletePage(){
      fetch("/board/create",{
        method : "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem('token')
        }
      })
    .then(function (res){
      if(res.status==200){
        alert("삭제 성공")
        location.href='/board/list';
      }
      alert("권한이 없습니다")
    })
    }
    </script>
    `
    for(let i=0;i<lists.length;i++)ret+=`${i+1}.  <a href="/board/${lists[i].id}">${lists[i].title}</a><br>`;
    return ret;
  }

  //하나의 게시글 조회
  async detailBoard(id: number) {
    const contents = await this.board.findOne(id);
    let ret=` <a href="/board/update/${contents.id}">수정</a>
              <a href="#" onClick="deletePage()" >삭제</a>
              <a href="javascript:history.back()">뒤로가기</a><br><br>
    제목 : ${contents.title} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ${new Date(contents.createdAt).getFullYear()}.${new Date(contents.createdAt).getMonth()}.${new Date(contents.createdAt).getDate()}<br><br><br>
    내용 : ${contents.text}
    <script>
    function deletePage(){
      fetch("/board/delete/${contents.id}",{
        method : "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem('token')
        }
      })
    .then(function (res){
      if(res.status==200){
        alert("삭제 성공")
        location.href='/board/list';
      }
      alert("권한이 없습니다")
    })
    }
    </script>
    `
    return ret;
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
    console.log(id)
    let property= await this.board.findOne({id:id},{relations:["user"]});
    if(property.user.identifedNumber!=user.userId){
      throw new UnauthorizedException();
    }
    this.board.delete(id)
    return "success";
  }

}
