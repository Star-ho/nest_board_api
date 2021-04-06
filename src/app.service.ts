import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  toBoardService(): string {
    return `<html>
    <head>
    <title>게시판</title>
    <script src="//code.jquery.com/jquery-3.3.1.js"></script>
    <link href="main.css" rel="stylesheet" type="text/css" />
    </head>
    <a href="/login" id='login' >로그인</a> 
    <a href="/signup" id='signup' >회원가입</a> 
    <a href="#" onClick="profile()" id='profile' >프로필</a> 

    <a href="#" onClick="toCreatePage()" >글쓰기</a>&nbsp&nbsp <a href="/" >홈으로</a><br><br>
    <div class="container">
    <h2>Board</h2>
    <ul class="responsive-table" id="ul" ></ul>
    </div>
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
      let ul=$('#ul')
      for (let i = 0; i <res.length ; i++) {
        let li = $('<li>')
        let id = $('<div>')
        let title = $('<div>')
        let createdAt = $('<div>')
        id.addClass('col col-1');
        title.addClass('col col-1');
        createdAt.addClass('col col-1');
        id.innerText = i+1;
        title.innerHTML = '<a href="/board/'+res[i].id+'">'+res[i].title+'</a>';
        createdAt.innerText = ''+new Date(res[i].createdAt).getFullYear()+'.'+(new Date(res[i].createdAt).getMonth()+1)+'.'+new Date(res[i].createdAt).getDate();
      }
//https://www.google.com/search?q=jquery+add+class&sxsrf=ALeKk001ecjaiE26v_Tl8WXkRaTZjaFTRw%3A1617720791445&ei=13VsYMHMGsamoATT5p3oCA&oq=jquery+add+class&gs_lcp=Cgdnd3Mtd2l6EAMyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAOgQIIxAnOgcIABCxAxBDOgQIABBDOgUIABCxAzoHCAAQhwIQFDoICAAQsQMQgwFQ-Y0aWPasGmD1rxpoA3AAeACAAXiIAc4OkgEEMS4xNpgBAKABAaoBB2d3cy13aXrAAQE&sclient=gws-wiz&ved=0ahUKEwiBlPrI7-nvAhVGE4gKHVNzB40Q4dUDCA0&uact=5
//https://stackoverflow.com/questions/31840070/dynamically-add-li-and-div-to-html-page/31840363
//
//https://codepen.io/faaezahmd/pen/dJeRex?editors=1100
//https://stackoverflow.com/questions/56970602/how-can-i-change-the-li-items-to-div-javascript
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
          if(res.identifedNumber){
            alert("회원가입 성공")
            location.href='/'
          }
          else if(res.msg){
            alert(res.msg);
          }else{
            alert('다시시도해주세요')
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

  mainCssService(): string{
    return `body {
      font-family: 'lato', sans-serif;
    }
    .container {
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 10px;
      padding-right: 10px;
    }
    
    h2 {
      font-size: 26px;
      margin: 20px 0;
      text-align: center;
      small {
        font-size: 0.5em;
      }
    }
    
    .responsive-table {
      li {
        border-radius: 3px;
        padding: 25px 30px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
      }
      .table-header {
        background-color: #95A5A6;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .table-row {
        background-color: #ffffff;
        box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
      }
      .col-1 {
        flex-basis: 10%;
      }
      .col-2 {
        flex-basis: 40%;
      }
      .col-3 {
        flex-basis: 25%;
      }
      .col-4 {
        flex-basis: 25%;
      }
      
      @media all and (max-width: 767px) {
        .table-header {
          display: none;
        }
        .table-row{
          
        }
        li {
          display: block;
        }
        .col {
          
          flex-basis: 100%;
          
        }
        .col {
          display: flex;
          padding: 10px 0;
          &:before {
            color: #6C7A89;
            padding-right: 10px;
            content: attr(data-label);
            flex-basis: 50%;
            text-align: right;
          }
        }
      }
    }`
  }
}
