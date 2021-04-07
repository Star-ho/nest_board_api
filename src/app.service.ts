import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  toBoardService(): string {
    return `<html>
    <head>
    <title>게시판</title>
    <script src="//code.jquery.com/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="main.css">
    
    <div id='login_wrapper' class='outer' >
    <div>
    <button type="button"  id='login' onClick="location.href='/login'"  >로그인</button>
    <button type="button"  id='signup' onClick="location.href='/signup'" >회원가입</button>
    <button type="button"  id='profile' onClick="profile()" >프로필</button>
    <button type="button"  id='logout' onClick="logout()" >로그아웃</button>


    </div>
    <h2>게시판</h2>
    <div>

    <button type="button"  onClick="toCreatePage()"  style="float: right;" >글쓰기</button>
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
    }
    table.type07 tbody th {
      width: 150px;
      padding: 10px;
      font-weight: bold;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
      background: #fcf1f4;
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
