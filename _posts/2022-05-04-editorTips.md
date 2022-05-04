---
layout: post
toc: true
title: "GIT-Hub를 연동하는 여러가지 방법"
categories: junk
tags: [tools,git]
author:
  - 박정아(Annie Park)
---

## Intro
형상관리툴인 git-hub를 사용하기 위해서는 여러가지 에디터를 활용하여 연결할 수 있는데,
그전에 가장 기본이 되는 환경설정 먼저 알아보고자 한다. 
### git설치 
<a href="https://git-scm.com/" target="_blank">https://git-scm.com/</a> 에 접속한다.<br>
본인이 사용하는 운영체제버전에 맞는 것을 다운로드 한다.
설치 후 window에서 cmd창을 열어서 git이라고 입력했을때 아래와 같이 노출된다면 성공이다.
<br>
<img src="https://github.com/anniep8911/anniep8911.github.io/blob/main/assets/images/capGit.JPG?raw=true"/>

### git-hub가입하기 
<a href="https://github.com/" target="_blank">https://github.com/</a>에 접속한다. <br>
sign up을 선택하여 가입을 진행한다.



## Atom과 연동하기
### Atom설치 
<a href="https://atom.io/">https://atom.io/</a>아톰을 다운받는다. <br>
Atom설치 후 file> setting을 연다. <br>

### git-plus설치
아래의 그림과 같이 +install을 선택한다.
<img src="https://lh3.googleusercontent.com/-qsZGW21WB3g/YGbFEa4ELeI/AAAAAAAAA8Y/cuVevF37pvY3hUw33DGXVDTchu_VGz6ngCLcBGAsYHQ/w626-h493/image.png"  alt="아톰예시"/><br>

git-plus 검색 후 install한다.
<img src="https://lh3.googleusercontent.com/-urE2EZeC71E/YGbFpHDUXbI/AAAAAAAAA8g/Pbke3P-JKbIhxOE8XKu1_UQsjd_-TpVsgCLcBGAsYHQ/w603-h214/image.png"  alt="아톰예시"/><br>

### git-plus 사용
나의 git repository에 연동할 폴더를 열어놓고 아래와 같이  package> github>tootle git tab을 열거나ctrl + shifr +9 를 누른다.
<img src="https://1.bp.blogspot.com/-o0rgjd6HlE8/YGbILFAMPFI/AAAAAAAAA9A/80T2pVqmuKcnaMQmrzD4W8ZkPwf9P70KwCLcBGAsYHQ/w593-h424/1111.jpg"  alt="아톰예시"/><br>

그러면, 아래와같이 오른쪽에 git toggle이 생기게되는데 여기에서 create repository 버튼을 누른다. <br>
<img src="https://lh3.googleusercontent.com/-tdI9XXRnEqI/YGbJuI7z_WI/AAAAAAAAA9I/C7h38DVaJOQtZ1q4tkNJEulb0tRrTdllACLcBGAsYHQ/w553-h509/image.png"  alt="아톰예시"/><br>


그러면 아래와같이 경로가 뜨게된다. 현재 저장할 페이지에서 오픈하였으므로 아래 경로 그대로 설정해준다. (만약 바꾸고싶다면 경로를 바꿔도 된다.)<br>
<img src="https://lh3.googleusercontent.com/-5CZ-cD9EaBw/YGbKChsfVPI/AAAAAAAAA9Q/mBVaq4hvm0QrTyUoqM2TzbGv4hWwvft1ACLcBGAsYHQ/w591-h249/image.png"  alt="아톰예시"/><br>

위에서 init을 선택하면 아래와 같이 git폴더가 생기게된다. 
<img src="https://lh3.googleusercontent.com/-tELt8GPnPPQ/YGbKOzicCEI/AAAAAAAAA9U/KNS8iRpegJo3_O3paZv_3rouwhG9viHvwCLcBGAsYHQ/w532-h294/image.png"  alt="아톰예시"/><br>