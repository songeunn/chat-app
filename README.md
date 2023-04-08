# Chat App

## 프로젝트 실행

[🚀 배포 바로 보러가기](https://song-chat-app.web.app/)

```bash
yarn install
yarn start
```

<br/>

## 1. 프로젝트 소개

`React`와 `Firebase`를 이용한 채팅 어플리케이션 입니다.

<br/>

### 사용 기술

- 라이브러리: React

- 스타일링: Styled-components

- 상태관리: Redux, Redux-toolkit

- 데이터베이스: Firebase

<br/>

## 2. 구현 기능

### 회원가입 페이지

![signup](/public/docs/signup.gif)

- 회원가입이 완료되면 메인 페이지로 이동합니다.

- 회원가입 시 유효성 확인

  - 이메일 형태가 아닌 경우

  - 이메일, 닉네임, 비밀번호를 입력하지 않고 가입을 누를 경우

  - 비밀번호를 최소 6자리 이상 입력하지 않았을 경우

  - 이미 존재하는 계정일 경우

- 유효성 확인 후 조건에 맞지 않는 경우 안내 텍스트를 보여주도록 설정하였습니다.

<br/>

### 2. 로그인/로그아웃

![loginLogout](/public/docs/loginLogout.gif)

- 로그인 시 유효성 확인

  - 이메일/비밀번호(로그인정보)가 일치하지 않는 경우

  - 이메일/비밀번호를 입력하지 않고 가입을 누른 경우

- 로그인 시 firebase에서 가져온 유저정보를 redux로 관리해주었습니다.

  - 새로고침 시 redux store에 담긴 데이터가 날아가므로 `redux-persist`를 이용하여 새로고침 시에도 session storage에 값이 저장되어있도록 해주었습니다.

- 유저정보 클릭 시 로그아웃 버튼이 보이도록 드롭다운으로 구현하였습니다.

- 로그인, 로그아웃 시 인증 상태에 따라 라우팅 처리를 해주었습니다.

  - 로그인 시 메인 페이지로 이동

  - 로그아웃되면 회원가입/로그인이 보이는 홈화면으로 이동

<br/>

### 3. 채팅방 생성

![createChat](/public/docs/createChat.gif)

- 채팅방 리스트 하단에 플로팅 버튼을 클릭 시 채팅방을 생성하는 모달이 보이도록 하였습니다.

- 채팅방 제목이 입력된 경우에만 생성이 가능하도록 하였습니다.

<br/>

### 4. 채팅 및 검색

![chatAndSearch](/public/docs/chatAndSearch.gif)

- 채팅을 보내고 경과한 시간을 확인할 수 있습니다.

  - `moment` 모듈을 이용하여 채팅이 보내진 시간과 현재 시간을 비교하여 경과한 시간이 보이도록 하였습니다.

- '나'와 '다른 유저'간 표시를 달리 해주었습니다.

- 채팅방 내용 및 유저 이름으로 검색을 할 수 있습니다.

  - 정규표현식을 이용하여 채팅방 내용 중 검색 키워드에 해당하는 내용을 검색할 수 있도록 하였습니다.

<br/>
