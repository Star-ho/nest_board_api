import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  toBoardService(): string {
    return `<html><head>
    <title>게시판</title>
    <script src="//code.jquery.com/jquery-3.3.1.js"></script>

    </head><body><a href="/board/list">게시판</a>
    <a href="/login" id='login' >로그인</a> 
    <a href="/signup" id='signup' >회원가입</a> 
    <a href="#" onClick="profile()" id='profile' >프로필</a> 

    <a href="#" onClick="toCreatePage()" >글쓰기</a>&nbsp&nbsp <a href="/" >홈으로</a><br><br>
    
    <table id="table">
    </table>
    <script>
    function toCreatePage(){
      fetch("/profile",{
        method : "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem('token')
        }
        })
      .then(function (res){
        if(res.status==200){
          location.href='/board/create';
        }else{
        alert("권한이 없습니다")
      }
    })
  }
  (async () =>{
    fetch("/board/list",{
      method : "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem('token')
      }
      })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.append(res.id)
        td = document.createElement("td").append(res.title);
        tr.append(td)
        $('#table').append(tr)
      }

    })
  })()
  </script>


    <script>
    (async () => {
      let res = await fetch("/profile",{
        method : "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem('token')
        },
      })
      if(res.user){  
        $('#signup').remove();
        $('#login').remove();
      }else{
        $('#profile').remove()
      }
    })()
      async function profile(){
      let res =  await fetch("/profile",{
          method : "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem('token')
        },
      })
      if(res.user){
        alert("안녕하세요 "+res.user+"님");
      }else{
        alert("로그인이 필요합니다")
      }
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
