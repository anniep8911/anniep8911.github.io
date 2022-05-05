---
layout: post
toc: true
title: "자바스크립트 압축하기"
categories: junk
tags: [tools,design]
author:
  - 박정아(Annie Park)
---

## Javascipt minify
자바스크립트 압축이 필요한 이유는 웹 사이트 퍼포먼스 개선에 가장 큰 의미가 있다. 압축이라는 뜻은 크게 아래와 같은 내용을 제거하는 작업을 의미한다
- 줄바꿈, 공백 및 들여쓰기 
- 주석
- 줄일 수 있는 if구문 및 형변환 축약 
- 논리적으로 실행되지 않는 데드코드 


### Google Closure Compiler
<a href="https://closure-compiler.appspot.com/home">https://closure-compiler.appspot.com/home</a>에 접속하여 코드를 입력하고 컴파일 한 후 다운받는다.

### toptal
<a href="https://www.toptal.com/developers/javascript-minifier/">https://www.toptal.com/developers/javascript-minifier/</a>에 접속하여 코드를 입력하고 minify하면 된다. 

### dean.edwards.name
<a href="http://dean.edwards.name/packer/">http://dean.edwards.name/packer/</a>에 접속하여 코드를 입력하고 pack하면 된다.


## Javascript Uglify
자바스크립트의 난독화는 코드 자체를 분석하기 어렵게 만들기 위함이다 그러나,난독화 단계를 높힐수록 코드를 해석하고 실행하는 속도가 느려질 수 있으므로 프로젝트에 맞춰 선택하는것이 좋다.



