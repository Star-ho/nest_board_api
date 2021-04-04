import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  toBoardService(): string {
    return `<html><body><a href="/board/">board service</a>
    <a href="/login">login</a> 
    <a href="/signup">signup</a> 
    <a href="/profile">profile</a> 
     </body></html>`;//클릭시 /board/로 이동
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
            "username":id,
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
