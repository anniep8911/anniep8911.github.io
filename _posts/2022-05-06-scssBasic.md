---
layout: post
toc: true
title: "SCSS의 기본(변수,반복문, 제어문)"
categories: junk
tags: [scss]
author:
  - 박정아(Annie Park)
---

## intro
  SCSS는 less, sass보다 'css like'하기때문에 CSS작성이 익숙했던 사람에게 적합하다.
### SCSS를 쓰는 이유
필자가 SCSS를 쓰는이유는 다음과 같다 <br>
<ol>
  <li>직관적인 선택자 : html과 같은 구조로 선택자를 선택할 수 있음</li>
  <li>크로스 브라우징 : mozilla, ie, firefox등에서 필요한 css요소를 자동으로 추가하여 컴파일함</li>
  <li>간소화 : 반복문 작업을 통한 반복작업 간소화</li>
  <li>재활용 : @mixin @include 활용을 통한 속성들의 재활용</li>
  <li>용량 간소화 : 불필요한 공백 및 들여쓰기를 없애는작업(minify) 과 @mixin 혹은 변수 사용을 통해 반복 내용 최소화</li>
</ol>

## SCSS 사용방법
### 선택자

먼저, 아래와 같은 문서구조가있다고 가정해보자 

```html
<html lang="en">
    <body>
        <div class="content drag">
            <header>
                <h3>content title</h3>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi asperiores
                    ex blanditiis cum a quos? Consequuntur ea amet temporibus odio nesciunt maiores,
                    corporis iure tempora quos perspiciatis, ipsa ullam nemo!
                </p>
            </header>
            <section>
                <div class="bar"></div>
            </section>
        </div>
    </body>
</html>
```
위의 문서구조에서 요소들을 선택할때 기존 CSS에서는 아래과 같이 선택을 한다.
```css
div.drag header {
  background-color: #fc0;
}
div.drag section {
  height: 640px;
  background-color: #ccc;
}
div.drag section .bar {
  width: 80px;
  height: 80px;
  background-color: #fc0;
  border-radius: 20px;
}
div.drag section .bar:active {
  cursor: -webkit-grab;
  cursor: grab;
}
```
그러나, SCSS를 활용하면 아래와 같이 선택하면 된다.
```scss
  $color:#fc0;
  div.drag{
      header{
          background-color: $color;
      }
      section{
          height: 640px;
          background-color: #ccc;

          .bar{
              width: 80px;
              height: 80px;
              background-color:$color;
              border-radius: 20px;
          }
          .bar:active{
              cursor:grab;
          }
      }
  }

```

즉, 아래와 같은 구조로 작성하면 된다는 것이다.
```text
조부모요소{
            부모요소{
                자식요소{}
              } 
          }
```

### 변수 
SCSS는  CSS+약간의 javascript 라고 보면 된다. <br>
js와 똑같이 변수 선언을 통해서 같은 내용을 대입 시킬 수 있다. <br>
scss에서 변수의 의미는 상수(const)와 사용법이 매우 유사하다. <br>
```text
  $변수명:값;
```
이렇게 선언한 변수를 사용하고 싶을땐 아래와 같이 사용하면 된다. <br>
```text
  선택자 {
    속성명 : #{$변수명};
  }
```
### 반복문(for)
아래와 같은 html문서가 있다고 해보자.
```html
<html lang="en">
    <body>
        <div class="content">
            <section>
                <article>
                  <div class="image i1"></div>
                </article>
                <article>
                  <div class="image i2"></div>
                </article>
                <article>
                  <div class="image i3"></div>
                </article>
                <article>
                  <div class="image i4"></div>
                </article>
            </section>
        </div>
    </body>
</html>
```

 .image에 각각 다른 배경이미지(background-image)를 넣을 때, CSS 작성방법은 아래와 같다.
```css
div.content .image{
  background-repeat : no-repeat;
  background-size : cover;
  background-position: center;
}
div.content .image.i1{
  background-image: url('../images/pic01.jpg');
}
div.content .image.i2{
  background-image: url('../images/pic02.jpg');
}
div.content .image.i3{
  background-image: url('../images/pic03.jpg');
}
div.content .image.i4{
  background-image: url('../images/pic04.jpg');
}
```

위의 css는 SCSS의 for문을 통해서 아래와 같이 작성할 수 있다.
```scss
div.content{
  div.image{
    @for $i from 1 through 4{
      &.i#{$i}{
         background-image: url('../images/pic0#{$i}.jpg');
      }
    }
  }
}
```

위와같이, scss에 for문은 아래와 같이 간단하게 사용할 수 있다.
```text
@for 변수 from 시작숫자 through 끝숫자{
  숫자 변동부분  -  #{변수}
}
```
결론은 숫자 변동부분에 선언한 변수를 넣어주면 시작부터 끝 숫자의 숫자가 연속으로 바인딩 되게된다.

### 조건문(if)
@if로 시작하며, 입력값이 true일때 결과값을 속성으로 지정할 수 있다.<br>
사용방법은 아래와 같다.
```text
@if (true가 되는 조건){
  속성값 : 속성명 ;
}
@else if(true가 되는 조건){
  속성값 : 속성명 ;
}
@else{
  속성값 : 속성명 ;
}
```
if, else if, else의 사용방법은 기존 js와 동일하지만, @가 들어가는 것이 다르다. <br>
해당 조건문은 scss내의 함수인 @mixin과 섞어서 사용할 수 있다. <br>
예시는 다음과 같다.<br>
```scss
  @mixin wid($widthSize){
    @if($widthSize >= 20){
      background-color : #fc0;
    }
    @else if($widthSize <= 10){
      background-color : #ff0;
    }
  }
```

즉, wid라는 mixin에 들어가는 parameter값에 따라서 background-color를 바꿀 수 있다.


### @mixin & @include
SCSS내에서 js의 '함수'와 가장 유사한것은 @mixin이다. <br>
js에서 함수인 function fn(){}을 만든다면 scss에서는 @mixin fn(){} 으로 만들수 있다.<br>
```scss
@mixin fn($param){
  @if(#{$param} == 'on'){
    background-color : 'red';
  }
}
```
이러한 mixin을 사용하려면 js의 fn() 대신에 @include fn()을 사용하면 된다. 
```scss
@mixin fn($param){
  @if(#{$param} == 'on'){
    background-color : 'red';
  }
}

div.text{
  @include fn('on');
}
```


### @mediaquery
SCSS에서 media query를 사용하는 방법은 기존 css와 같으나, 아래와 같이 변수와 mixin을 활용하여 간편하게 작성할 수 있다.
```scss
$mobwidth : 420px;
$tabwidth: 1024px;
@mixin mob{
  @media (min-width:0px) and (max-width:$mobwidth){
    @content;
  }
}
@mixin tab{
  @media (min-width:$mobwidth) and (max-width:$tabwidth){
    @content;
  }
}
```

위와 같이 미리 선언해놓으면, 아래와 같이 include를 통하여 직관적으로 스타일을 적용할 수 있다.
```scss
.hdrWrap{
  width: 80%;
  max-width:1080px;
  @include mob{
    width: 90%;
  }
  @include tab{
    width: 90%;
    max-width:700px;
  }
}
```

### responsible
반응형 웹은 디바이스 사이즈에 따라서 레이어가 깨지지 않도록 작성된 웹을 말한다.<br>
반응형은 media query를 이용한다.


### adaptive
적응형 웹은 특정 디바이스에 도달하였을때, 해당 디바이스용 페이지가 노출 될 수 있도록 작성된 웹을 말한다. <br>
적응형은 아래의 javascript를 이용하여 디바이스를 구분한 뒤 필요한 페이지를 노출한다.
```js
   var brow = navigator.userAgent;
      if(brow.match('ios | Android | Symbian | Apple | Samsung | LG | Blackberry | iPhone | Gallaxy')){
          /*조건이 참이면 실행하게됨*/
          window.location.href = '경로'
      }else if(brow.match('iPad')){
          window.location.href = '경로'
      }
```


### @extend
extend란 상속을 의미한다. <br>
만약 아래와 같은 내용을 그대로 상속 받는다고 하면,
```scss
  div{
    width: 80%;
    max-width:1080px;
    margin : 0 auto;
  }
```
아래와 같이 새로운 선택자에 상속 받을 수 있다.
```scss
  div{
    width: 80%;
    max-width:1080px;
    margin : 0 auto;
  }

  div#div2{
    @extend div;
  }
```