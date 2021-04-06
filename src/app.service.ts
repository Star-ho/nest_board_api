import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  toBoardService(): string {
    return `<html><head>
    <style type="text/css">
    p {
      margin:0px;
    }
    br {
      margin:1px;
    } 
    </style>
    </head><body><a href="/board/list">board service</a>
    <a href="/login">login</a> 
    <a href="/signup">signup</a> 
    <a href="#" onClick="profile()" >profile</a> 
    <script>
      async function profile(){
        await fetch("/profile",{
          method : "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem('token')
        },
      })
      .then(res => res.json())
      .then(res => alert("안녕하세요 "+res.username+"님"))
      }
    </script>
     </body>
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
        if(res.success){
          localStorage.setItem("token",res.token);
          alert("로그인성공");
          location.href='/';
          }else{
            alert("id와 비밀번호를 확인해 주시기 바랍니다");
          }
        })
      }
      </script>
     </body></html>`;
  }
}
