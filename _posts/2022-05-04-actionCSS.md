---
layout: post
toc: true
title: "Keyframe and hover"
categories: junk
tags: [css]
author:
  - 박정아(Annie Park)
---

## Zeplin 
가끔 빠르게 디자인을 구현해야할때 포토샵 레이아웃 기준으로 html과 css의 가이드를 제공하는 프로그램이 있다.
지금까지 photoshop으로 모든 디자인을 제작해왔으므로, 포토샵과 연동하여 편리하게 구현해 보는 방법을 다음과 같이 찾았다.
### Zeplin설치하기
<a href="https://app.zeplin.io/welcome" target="_blank">제플린사이트</a>에 접속 후 각자의 컴퓨터에 맞는 설치프로그램을 다운받는다. <br>
설치시 구글 계정과 연공해주면 web에서도 관리가 용이하다. <br>
구글 계정 연동 후 설치가 완료되면 아래와 같이 뜬다.<br>
<img src="https://1.bp.blogspot.com/-2wNr0CpwV9c/YI9H9anPt-I/AAAAAAAABJg/hj75mdQavjMujk8f3TSzU35Zx_Al4154wCLcBGAsYHQ/s320/%25EC%2584%25A4%25EC%25B9%2598%25EC%2599%2584%25EB%25A3%258C.JPG"> <br>
참고로, 제플린이 지원해주는 플러그인은 포토샵 외에 CD, Figma, Sketch와 같은 프로그램들이 있다.<br>


### photoshop plugin
Zeplin> help> installadobeplugin을 선택하여 설치를 진행한다. <br>
이때, 포토샵이 켜져있으면 설치가 진행되지 않으므로 포토샵을 끄고 진행하도록 한다.
<img src="https://1.bp.blogspot.com/-SxQHcx3h1gk/YI9JZO7fy5I/AAAAAAAABJo/d82E0uV94TourTsQaUMB9L3msddN5x8PwCLcBGAsYHQ/w604-h303/%25ED%258F%25AC%25ED%2586%25A0%25EC%2583%25B5%25ED%2594%258C%25EB%259F%25AC%25EA%25B7%25B8%25EC%259D%25B8%25EC%2584%25A4%25EC%25B9%2598%2B1.png"> <br>
설치후 포토샵을 다시 켜고  window-extension에서 확인했을때 다음과 같이 zeplin이 보이면 설치에 성공한것이다.
<img src="https://1.bp.blogspot.com/-IevYQh56_og/YI9JlM6hDaI/AAAAAAAABJs/zCiMq902ZdkgdqzaVHAuy-muRcfWA415wCLcBGAsYHQ/w694-h390/%25ED%258F%25AC%25ED%2586%25A0%25EC%2583%25B5%25ED%2594%258C%25EB%259F%25AC%25EA%25B7%25B8%25EC%259D%25B8%25EC%2584%25A4%25EC%25B9%2598%2B1.png"> <br>



## 본격 활용
이제, 본격적으로 포토샵에서 제플린을 활용해보자. <br>
그전에 다음과 같은 유의사항을 확인한 후 작업을 하도록 하자<br>
- 포토샵으로 제플린을 실행하려면 포토샵 파일의 확장자명은 반드시 .psd여야한다.<br>
- canvas로 만들어진 문서는 사용할 수 없다. <br>
- 만약 artboard로 만들어진 문서가 없다면 변환이 필요하다.<br>

### Zepin Project 생성 
아래의 화면에서 create project버튼을 클릭한다. <br>
<img src="https://1.bp.blogspot.com/-pZ0VuJDcsCA/YI9MI4y3b0I/AAAAAAAABKI/ZForsmuD2AEsQwTB36XvlFbwsDjKd21YQCLcBGAsYHQ/w441-h314/%25ED%2594%2584%25EB%25A1%259C%25EC%25A0%259D%25ED%258A%25B8%25EC%2583%259D%25EC%2584%25B11.JPG"> <br>

디바이스를 선택하면 되는데, 이 포스팅에서는 web를 만들 예정이기때문에 web을 선택하고 create버튼을 클릭한다. <br>
<img src="https://1.bp.blogspot.com/-zbAoSof1vL4/YI9MT9dmncI/AAAAAAAABKM/1hAHeZns97oTTOSjFB5W2UhIOl81LF17wCLcBGAsYHQ/s320/sfdsf.JPG"> <br>

### Photoshop
프로젝트 생성 후 포토샵에서 본인 디자인.psd파일을 열고 window-extention-zeplin을 선택하면 아래와 같은 툴바가 추가된다. <br>
(노란색 버튼 없다고 놀라지말것, 아트보드화를 하지 않아서 그렇다.)
<img src="https://1.bp.blogspot.com/-0743xLWYgNQ/YI9MyH7Hr1I/AAAAAAAABKY/6RcRtxd4rDcEwIMan-0aUpuFWHAOA3i9ACLcBGAsYHQ/s320/sdfsdfsdfsdf.JPG"> <br>

해당화면이 뜨면 다음과 같이 아트보트 툴을 선택한다 <br>
<img src="https://1.bp.blogspot.com/-r8t8L4m6mYE/YI9M6xj8qkI/AAAAAAAABKc/xMc-0Y_Cgn8ts0-oM1OndWYb53YWxXj0QCLcBGAsYHQ/s0/%25ED%258F%25AC%25ED%2586%25A0%25EC%2583%25B5%25ED%2594%258C%25EB%259F%25AC%25EA%25B7%25B8%25EC%259D%25B8%25EC%2584%25A4%25EC%25B9%2598%2B1.png"> <br>
그 후에 변환할 pds의 크기만큼 선택하여 캔버스를 아트보드화 한다.<br>
<img src="https://1.bp.blogspot.com/-wTByc42Pl-M/YI9NAI_cmqI/AAAAAAAABKg/_mfzsOnOEQAwfkc3MJib4MSBDZ2COwITgCLcBGAsYHQ/s320/%25EC%2595%2584%25ED%258A%25B8%25EB%25B3%25B4%25EB%2593%259C%25EB%25B3%2580%25ED%2599%2598.png"> <br>

이렇게 선택하면 아래와 같이 zeplin화면에서 export버튼이 생성되게 된다.<br>
<img src="https://1.bp.blogspot.com/-0743xLWYgNQ/YI9MyH7Hr1I/AAAAAAAABKY/6RcRtxd4rDcEwIMan-0aUpuFWHAOA3i9ACLcBGAsYHQ/s320/sdfsdfsdfsdf.JPG"> <br>

노란색 버튼을 클릭하면 아래와 같이 만들었던 프로젝트가 생성되고, import버튼이 생긴다. 해당 버튼을 눌러보자 <br>
<img src="https://1.bp.blogspot.com/-ZMISQiaxoNg/YI9NQ6jRpWI/AAAAAAAABKw/0uEOQAz7GFAEVOrh0Lh3SWWLshIfmDEQQCLcBGAsYHQ/s320/sadadsas.JPG"> <br>

import버튼을 누르면 아래과 같이 zeplin으로 해당 pds파일이 넘어가게 된다.<br>
<img src="https://1.bp.blogspot.com/-YDHLHgE7nTk/YI9NhhuY9bI/AAAAAAAABK4/rXBzzjxndakPw6VY89SaeE53qkStCkv2ACLcBGAsYHQ/s320/dfsdfdsfsdfsd.JPG"> <br>


### 다시,Zeplin
import해서 넘어온 파일을 클릭해서 들어가면 아래와 같이 요소를 선택할때마다 편리하게 css와 html이 만들어지는것을 확인할 수 있다. <br>
<img src="https://1.bp.blogspot.com/-O1l6CGuri1U/YI9Nw9wnTXI/AAAAAAAABK8/AfNL37xXLj4Oc3EmK1pmHOYuBwvEUy6JACLcBGAsYHQ/w656-h493/sadsadasdasd.png"> <br>
