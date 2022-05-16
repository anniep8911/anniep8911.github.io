---
layout: post
toc: true
title: "자바스크립트 함수"
categories: junk
tags: [javascript]
author:
  - 박정아(Annie Park)
---

## 함수
함수를 만드는 이유는 간단히 다음과 같다
<ol>
    <li>기능을 한 단어로 축약하고 싶을 때</li>
    <li>입출력 기능을 하는 기계를 만들고 싶을 때</li>
</ol>

### function fn(){}
함수 선언방법은 다음과 같다.
```js
    function 함수명(){
        함수내용;
    }
```
이러한 함수는 여러가지 방법으로 활용할 수 있는데, 
```js
    function 함수명(){
        함수내용;
    }

    함수명();
```
과 같이 재활용하거나 
```js
    document.queryseletor('함수').onclick = function(){}    
```
과 같이 콜백함수로 사용할 수 있다.

### 화살표함수(ES6)
화살표함수는 ()=>{}이러한 형식으로 함수를 표기하는 방법이다.<br>
그러나, 다음과 같이 작성하면 오류가 난다.
```js
    함수명()=>{ 함수내용;}
```
이러한 함수 타입은 다음과 같은 형태로 콜백함수에서 사용한다.
```js
   document.queryseletor('함수').onclick = ()=>{ 함수내용; };  
```
위와같이 단순하게 보면 function(){}형태의 콜백함수를 '편하게'쓰기 위해 생성된것 같지만, 
정확히 말하자면 function(){}표기법을 간략하게 하기 위해 만들어진것은 아니다.
그 차이를 알수있는 부분이 바로 this부분인데, 
```js
   document.queryseletor('함수').onclick = ()=>{this};  
   document.queryseletor('함수').onclick = function(){this};  
```

위와 아랫줄의 this의 차이는 확실하게 구분이된다.<br>
먼저 화살표 함수의 this는 클릭된 자체, 즉 콜백 함수를 발생시키는 대상이 아닌 window가 대상이 되고 , 아래의 일반 함수의 this의 경우엔 클릭된 자체, 즉 콜백함수를 발생시키는 대상을 의미한다.<br>

따라서, 화살표 함수에서 this를 사용하고 싶다면 다음과 같이 사용하면 된다.
```js
   document.queryseletor('함수').onclick = function(e){e.currentTarget};  
```
**결론은 this가 가르키는 방향으로 봤을때 화살표함수는 완벽한 function(){}의 대용품이라고 할 수 없는 것이다. 그러나, this 구조를 잘 이해하고 사용한다면 충분히 직관적인 코드를 짤때 유용할 것이다.


## parameter
### 함수의 재활용


## crousel slide
### logic
crousel slide(무한루프 슬라이드)는 다음과 같은 로직을 가지게 된다. <br>
<img src="https://lh3.googleusercontent.com/-tc1Mi7a7DkY/YGr_tuhl-WI/AAAAAAAABAg/LLGoN0vD9ckG4AS48_es6rAOpiSKgqdFgCLcBGAsYHQ/image.png" />

만약, 위의 그림처럼 노란색 영역이 전체 영역이고, 핑크색이 노출될 article들이며, 
초록색영역만이 실제로 노출되는 영역이라고 한다면 어떨까?

이때 생각해볼 수있는건 초록색 영역 외의 영역을 overflow : hidden으로 감추고 노란색 영역의 marginLeft값을 변경시키면서 초록색 영역으로 들어갈 article들을 변경시킬 수 있다.

그렇다면, 이때 문제점은?

바로 끝이있다는거다.
그러면 먼저 , 끝을 안보여주려면 어떻게 해야할까?
만약 해당 슬라이드가 우측으로만 움직인다면, 이미 지나간 article들을 뒤로 보내주면 된다.
<img src="https://lh3.googleusercontent.com/-26Y-IXZq5Ik/YGupn1RaQ7I/AAAAAAAABA4/-3rFqTlsQ_EUSoUGXs-NedrBVacZe_22ACLcBGAsYHQ/w643-h356/image.png" />

만약, 반대의 경우라면? 맨 뒤의 슬라이드를 맨앞으로 보내주면된다.
이때, 하나의 문제점이 더 있다. margin으로 움직이는 상태에서 요소가 변경되면 원래 노출시키려했던 article의 위치가 변경되기때문에 margin값은 원하는 만큼 움직였다가 다시 원래의 값의로 세팅해주는 것이 좋다.
<img src="https://lh3.googleusercontent.com/-tLyGvxZPLCw/YGupsbjSpGI/AAAAAAAABA8/4x6BrjxJ0RwHubhpOli5wC1AsHQESRKywCLcBGAsYHQ/w586-h315/image.png" />

### code
먼저 클릭시 다음과 같은 애니메이션을 작성한다.<br>
```js
  imgGr.animate({
                marginLeft: '-66.66%',
                },{
                duration: 500,
                iterations:1,
                fill:'forwards',
            });
```
이 애니메이션은 left버튼을 클릭했을 때  한번 이동하는 애니메이션이다. <br>
총 세개의 아티클이 슬라이드를 이루고있기때문에 처음 -33.33%의 기준으로 한칸 더 이동한다고 보면 된다.<br>
한칸 더 이동 시킨 후 이동이 완료 되면 돌아오는 function을 넣어야하는데,<br> animate함수는 무조건적 비동기 처리를 하는것 같다 따라서 작동 순서를 아무리 조작해도 느리다. <br>또한, animate함수로 변경된 css는 다시 animate로 변경시킬 수 밖에없다. <br>

따라서 이 애니메이션이 작동한 5초 뒤에 아래와 같이 실행시켰다.<br>
```js
    setTimeout(function(){
       imgGr.animate({
       marginLeft: '-33.33%',
       },{
       duration: 0,
       iterations:1,
       fill:'forwards',
       });
        imgGr.append(document.querySelectorAll('.slideView>.slideGroup>.article')[0]);
     },500);
```

animate를 통해 이동했던 css를 다시 원래의 view로 돌리고 맨 앞에있는애를 맨 뒤의 요소로 보냈다. <br> 이렇게 진행을하면 animate에서 from,to를 활용해서 한번에 진행했을때 발생하는 깜빡임이 사라진다. <br> 

## accordion