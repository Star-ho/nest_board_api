import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  toBoardService(): string {
    return `<html><body><a href="/board/">board service</a>
    <a href="/login">login</a> 
    <a href="/signup">signup</a> 
    <a href="/profile">profile</a> 
     </body>

     <p>아직 프론트가 완성되지 않았습니다.... 기능 확인을 위해 아래의 curl을 사용하시기 바랍니다....</p>
     <p>회원가입 curl --location --request POST 'ec2-54-180-149-67.ap-northeast-2.compute.amazonaws.com/users/signup' \ --header 'Content-Type: application/json' \ --data-raw '{  "id": "[아이디]",  "username": "[유저이름]",  "password": "[비밀번호]" }'</p>

<p>로그인 
<p>curl --location --request POST 'ec2-54-180-149-67.ap-northeast-2.compute.amazonaws.com/auth/login' \ --header 'Content-Type: application/json' \ --data-raw '{   "id": "[아이디]",  "password": "[비밀번호]"  }'</p>

<p> 로그인 확인 </p>
<p>curl --location --request GET 'ec2-54-180-149-67.ap-northeast-2.compute.amazonaws.com/profile/' \ --header 'Authorization: Bearer [토큰]' \ --header 'Content-Type: application/json'</p>

<p> 전체 게시판 조회</p> 
<p>curl --location --request GET 'ec2-54-180-149-67.ap-northeast-2.compute.amazonaws.com/board/'</p>

<p>게시글 조회 </p>
<p>curl --location --request GET 'ec2-54-180-149-67.ap-northeast-2.compute.amazonaws.com/board/[게시글 ID]'</p>

<p>게시판 글쓰기 </p>
<p>curl --location --request POST 'ec2-54-180-149-67.ap-northeast-2.compute.amazonaws.com/board/' \ --header 'Authorization: Bearer [토큰]' \ --header 'Content-Type: application/json' \ --data-raw '{  "title":"[제목]",  "text":"[내용]" }'</p>

<p> 게시판 업데이트 </p>
<p>curl --location --request POST 'ec2-54-180-149-67.ap-northeast-2.compute.amazonaws.com/board/update/[게시글 ID]' \ --header 'Authorization: Bearer [토큰]' \ --header 'Content-Type: application/json' \ --data-raw '{  "title":"[제목]",  "text":"[내용]" }'</p>

<p> 게시판 삭제 </p>
<p>curl --location --request GET 'ec2-54-180-149-67.ap-northeast-2.compute.amazonaws.com/board/delete/[게시글 ID]' \ --header 'Authorization: Bearer [토큰]' \ --header 'Content-Type: application/json'</p>
     </html>`;
  }  
  toSignUp(): string {
    return `<html><body>
      <input type="text" placeholder="아이디" id="id" />
      <input type="password" placeholder="비밀번호" className="password_input" id="pw" />
      <input type="username" placeholder="사용자 이름" className="password_input" id="username" />
      <input type="button" onclick="signup()" id="submit" value="회원가입" />
      <script>
      function signup(){
        let id = document.getElementById("id").value;
        let pw = document.getElementById("pw").value;
        let username = document.getElementById("username").value;
        console.log(id,pw,username)
        fetch("/users/signup",{
            method : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            id: id,
            username: username,
            password: pw
          }),
        })
        .then(res=>res.json())
        .then(res=>{
          console.log(res)
          if("identifedNumber" in res){
            alert("회원가입 성공")
            location.href='/'
          }
        })
      }
      </script>
     </body></html>`;
    }
  tologinPage(): string {
    return `<html><body>
      <input type="text" placeholder="아이디" id="id" />
      <input type="password" placeholder="비밀번호" className="password_input" id="pw" />
      <input type="button" onclick="login()" id="submit" value="로그인" />
      <? header("12311111111123: 121111111111111113"); ?>   
      <script>
      function login(){
        let id = document.getElementById("id").value;
        let pw = document.getElementById("pw").value;
        fetch("/auth/login",{
            method : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
            "id":id,
            "password":pw
        }),
      })
        .then(res=>res.json())
        .then(res=>{
          console.log(res)
          if("access_token" in res){
            alert("로그인성공")
            //location.href='/'
          }
        })
      }
      </script>
     </body></html>`;
  }
}
