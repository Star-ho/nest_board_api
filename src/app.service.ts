import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  toBoardService(): string {
    return `<html>
    <head>
    <title>게시판</title>
    <script src="//code.jquery.com/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="main.css">
    </head>

    <body>
    <div id='login_wrapper' >
    <div style='width:500px'>
    <div class='btn_group' >
    <button type="button"  id='login' onClick="location.href='/login'" class='button' >로그인</button> 
    <button type="button"  id='signup' onClick="location.href='/signup'" class='button' >회원가입</button>
    <button type="button"  id='profile' onClick="profile()" class='button' >프로필</button>
    <button type="button"  id='logout' onClick="logout()" class='button' >로그아웃</button>
    </div>
    </div>
    <h2 style='margin:3px'>게시판</h2>
    <div style='width:500px'>
    <div class='btn_group' >
    <button type="button"  onClick="toCreatePage()" class='button' >글쓰기</button>
    </div>
    </div>
    <div>
    <table class="type07" id="table" >
    <thead id='thead'>
    </thead>
    <tbody  id="tbody"  >
    </tbody>
    </div>
    </div>
    <script>
    function logout(){
      sessionStorage.removeItem('token')
      location.href='/'
      //jwt 제거하는거 요청해야함----------
  }


    function toCreatePage(){
      fetch("/profile",{
        method : "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : sessionStorage.getItem('token')
        }
        })
      .then(function (res){
        if(res.status==200){
          location.href='/board/create';
        }else{
        alert("로그인 해주시기 바랍니다")
      }
    })
  }
  (async () =>{
    fetch("/board/list",{
      method : "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : sessionStorage.getItem('token')
      }
      })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      let thead=$('#thead')
      let li = $('<tr>')
      let id = $('<th>')
      let title = $('<th>')
      let createdAt = $('<th>')
      id.css('width',"70")
      id.css('text-align',"center")
      createdAt.css('text-align',"center")
      title.css('text-align',"center")
      title.css('width',"280")
      id.text('no')
      title.text('제목')
      createdAt.text('날짜')
      li.append(id).append(title).append(createdAt)
      thead.append(li)
      let tbody=$('#tbody')
      for (let i = 0; i <6 ; i++) {
        let li = $('<tr>')
        li.addClass("cursor_test")
        let id = $('<th >')
        let title = $('<th >')
        let createdAt = $('<th >')
        id.css('width',"70")
        id.css('text-align',"center")
        createdAt.css('text-align',"center")
        title.css('width',"280")
        id.text(res[i].id)
        title.text(res[i].title)
        createdAt.text(''+new Date(res[i].createdAt).getFullYear()+'.'+(new Date(res[i].createdAt).getMonth()+1)+'.'+new Date(res[i].createdAt).getDate())
        li.append(id).append(title).append(createdAt)
        tbody.append(li)
        }
        clickTr();
    })
  })()
  </script>
    <script>
    (async () => {
      let res = await fetch("/profile",{
        method : "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : sessionStorage.getItem('token')
        },
      }).then(res=>res.json())
      console.log(res)
      if(res.username){  
        $('#signup').remove();
        $('#login').remove();
      }else{
        $('#logout').remove();
        $('#profile').remove()
      }
    })()
      async function profile(){
      let res =  await fetch("/profile",{
          method : "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : sessionStorage.getItem('token')
        },
      }).then(res=>res.json())
      if(res.username){
        alert("안녕하세요 "+res.username+"님");
      }else{
        alert("로그인이 필요합니다")
      }
      }
    </script>
    <script>
      function clickTr(){
        $("#table tr").click(function(){
          if($(this)[0].children[0].textContent!='no')
            location.href='/board/'+$(this)[0].children[0].textContent;
      });
      }
    </script>
     </body>
     </html>`;
  }  
  toSignUp(): string {
    return `<html><html>
    <head>
    <title>게시판</title>
    <script src="//code.jquery.com/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="main.css">
    <style> 
     .input_div{
       margin:7px;
     }
     .input_val{
      width:250px;height:40px;font-size:20px;
      margin:10 0 10;

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
      <div style='width:200px; float:left;'>
        <h2 class='h2'>아이디</h2>
        <h2 class='h2'>비밀번호</h2>
        <h2 class='h2'>사용자 이름</h2>
      </div>
      <div style='width:300px;  float:left;'>
        <input type="text" class='input_val' placeholder="아이디" id="id" />
        <input type="password" placeholder="비밀번호" class="input_val" id="pw" />
        <input type="username" placeholder="사용자 이름" class="input_val" id="username" />
      </div>
    </div>
    <div class='btn_group' stlye='width:500px;'>
      <button type="button" style='width: 110;' id='logout' onClick="signup()" class='button' >회원가입</button>
      <button type="button" style='width: 60;' id='logout' onclick="location.href='/'" class='button' >취소</button>
    </div>
    </div>

      <script>
      function signup(){
        let id = document.getElementById("id").value;
        let pw = document.getElementById("pw").value;
        let username = document.getElementById("username").value;
        if( id ==''){
          alert("아이디를 입력해 주세요");
          return;
        }
        if( pw ==''){
          alert("비밀번호를 입력해 주세요");
          return;
        }
        if( username ==''){
          alert("사용자 이름을 입력해 주세요");
          return;
        }
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
    return `<html>    <head>
    <title>게시판</title>
    <script src="//code.jquery.com/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="main.css">
    <style> 
     .input_div{
       margin:7px;
     }
     .input_val{
      width:250px;height:40px;font-size:20px;
      margin:10 0 10;

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
      <div style='width:200px; float:left;'>
        <h2 class='h2'>아이디</h2>
        <h2 class='h2'>비밀번호</h2>
      </div>
      <div style='width:300px;  float:left;'>
        <input type="text" class='input_val' placeholder="아이디" id="id" />
        <input type="password" placeholder="비밀번호" class="input_val" id="pw" />
      </div>
    </div>
    <div class='btn_group' stlye='width:500px;'>
      <button type="button" style='width: 110;' id='logout' onClick="login()" class='button' >로그인</button>
      <button type="button" style='width: 60;' id='logout' onclick="location.href='/'" class='button' >취소</button>
    </div>
    </div>
    </body>

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
          sessionStorage.setItem("token",res.token);
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
    return `
    .button{ 
      border-top-left-radius: 5px; 
      border-top-right-radius: 5px; 
      border-bottom-left-radius: 5px; 
      border-bottom-right-radius: 5px; 
      margin: 2px; 
      float: right;
    } 

    .btn_group button{ 
      border: 1px solid skyblue; 
      background-color: rgba(0,0,0,0); 
      color: skyblue; 
      padding: 5px; 
    } 

    .btn_group button:hover{ 
      color:white; 
      background-color: skyblue; 
    }


    #login_wrapper { 
      border: 20px solid lightblue;
      padding: 5px 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 700px; height: 500px;
      margin-left: -400px;
      margin-top : -300px;
      
      display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } 
    .cursor_test {cursor: pointer;}
    table.type07 {
      border-collapse: collapse;
      text-align: left;
      line-height: 1.5;
      border: 1px solid #ccc;
      margin: 20px
    }
    table.type07 thead {
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
      background: #F0F8FF;
    }
    table.type07 thead th {
      padding: 10px;
      font-weight: bold;
      vertical-align: top;
      border: 1px solid #ccc;
    }
    table.type07 tbody th {
      width: 150px;
      padding: 10px;
      font-weight: bold;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
      background: #fcf1f4;
      border: 1px solid #ccc;
    }
    table.type07 td {
      width: 350px;
      padding: 10px;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
    }
    .changeColor {
      background-color: #bff0ff;
      }
      
`
  }
}
