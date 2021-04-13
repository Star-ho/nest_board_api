NestJS기반 게시판 페이지
==========
### 현재 기능
* Google OAuth기능
* jwt를 이용한 로그인
* 로그인 확인기능
* 게시판 CRUD
* 게시판 CRUD시 권한확인
     

### 추가하고 싶은 것들
* 게시판 글쓰기 에디터 넣기
* nestjs+react+elastic search -> autocomplete 구현
* 모듈들 정리
* 관리자 페이지
* jwt세션 유지 시간관리
  - 현재 30분으로 설정, 사용자가 29분까지 페이지에 요청을 보내도 30분이 되면 jwt가 파기됨
  - 사용자 세션 유지시간을 어떻게 처리할 것인가에 대한 고민이 필요

++++ 정말 모든걸 완성 후 채팅 서비스 구현

### 현재 aws에서 서비스중
http://ec2-54-180-149-67.ap-northeast-2.compute.amazonaws.com/
