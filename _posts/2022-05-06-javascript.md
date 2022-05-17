---
layout: post
toc: true
title: "JavaScript"
categories: junk
tags: [javascript]
author:
  - 박정아(Annie Park)
---

## 변수
변수는 다음과 같이 나눌 수 있다.
<ul>  
  <li>선언부 <br> 변수와 변수명을 입력하는 부분이다 e.g) var name, let name , const name</li>
  <li>할당부 <br> 변수명과 값을 입력하는 부분이다. e.g)name='park' , name='lee'</li>
  <li>범위 <br> 범위는 사용범위를 의미한다. 선언된 변수가 반드시 선언된 영역에서만 쓸 수 있는지, 바깥으로 나갈 수 있는지에 대한 범위를 의미한다.</li>
</ul>

### var, let, const
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEhqcTMHy1ede1QKUE0WuTGZRHEhjTKZFGlHIkmz_M6inexRyiDsnvPdT_muCXkOMDlqb5drZ2ZednvoWLM1VzEjTRkiRHppJl7__JpOBl0ItbebNBLZvXyNlXKjGW31VOQ6P_gfRFQk7-b8OEE6GymQHu-oyJ0xmCuIa7EEHw-xMy395ilheup5xTXU=w597-h125" />


### 전역변수
window 자체에서 선언하는 변수

### 지역변수
특정부분에서만 사용하는 변수

### hoisting
예를들어 다음과 같은 코드가 있다고 가정해보자.
```js
console.log(k);
var k = 'kim';
console.log(k);
```
결과는 위의 경우엔 undifined, 아래의 경우엔 kim이 뜰 것으로 예상할 수 있을것이다.<br>

그런데, 여기서 이상한점이있다. 자바스크립트의 경우 위에서부터 아래로 읽어 나가는데, 위에 k이라는 변수가 없는데도 불구하고 오류가 아닌, undifined를 띄운다니 말이다.
이것을 hoisting현상이라고 한다. <br>

hoisting현상은 사용한 변수가 아래가 선언되었을때 자바스크립트 자체에서 변수만 위로 올려서 읽는 것이다. (함수도 마찬가지!)

## DOM
### ES5
```js
  document.getElementById('아이디명');
  document.getElementsByClass('클래스명');
  document.getElementsByTagName('태그명');
```
여기서 내장함수 자체에서도 알 수 있듯이 , elements의 경우 복수의 dom을 탐색하기 때문에 해당 내용은 배열로 저장되게 된다.
### ES6
```js
  document.querySelector('dom명');
  document.querySelectorAll('dom명');
```
ES5기준으로 변경된걸 보면, id , class, tag이름 등을 내장함수 자체로서 구분하지 않고
queryselector를 통해서 단수의 dom 혹은 복수의 dom을 탐색할 수 있다.
여기도 마찬가지로 class, tag명 등 복수로 들어올 수 있는 dom은 querySelectorAll로 가지고 와야하고 해당 dom은 배열로 들어온다.

## 절차 
자바스크립트는 재밌게도, 위에서 아래로 읽지만, 꼭 그런것은 아니다.<br>
아래와 같은 코드가 있다고 보자
```js
  var a = 1,b=2;
  console.log(a+b);
  setTimeout(function(){console.log(a*b)},500);
  console.log(a-b);
```
만약, javascript가 아닌 다른 언어라면 마지막 a-b는 a*b가 진행된 0.5초 뒤 이어서 진행이 되게된다. 그러나 javascript는 다르다. 이 코드들이 도데체 어떻게 동작하기 때문에 이렇게 나오는 것일까?

우선 선언한 변수는 heap이라는 저장공간으로 들어간다.<br>
<img  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8z5sCAPmhObha-dEA4zZR3mURz3rqDcLrrwBH_z9HTbQPEdDBLf6POq5Hmc_9DkIxYSRV1XiIKsKKGUT1-dt__HYGI4BsKUZh3gH3n5fC1wGMYc5cXD7gUVF2yjU7Mc97hbbQE7Zei3lpBmBU39oIXWkVSRqKvXv1aH9IquENiF93udjUO9PaKELG/w614-h345/%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C.png"/>

그 다음 함수들은 stack이라는 곳으로 들어가서 한줄씩 실행되는데, stack의 특징은 단 한줄의 함수만 받을 수 있다는 것이다.<br>
따라서 아래와 같이 첫번째 줄이 stack에 넣어지고 바로 실행된다. <br>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_8WhYmh53e-ARHSkQAK45V9pf8Oax0oC2mUWLiX8MtZcQ0K5_S3xP8AU_MXIOozI-ylC3ucjmf7PafvuLnoz8SIrPze3nMtxU5y28AEaN_zHTjC2f7q5Kfb_qW3JCQFZlhp9sCmLp0wcFMrSdVRhMOb2IhQ_17LJtx7J_XLDYratcYZ8xsnwrFqKQ/w661-h371/%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C.png" /><br>
그리고 나머지는 대기실에서 대기하고있다가 한개씩 que 로 넘어가서 stack에서 한줄에 대한 일을 끝마치면 바로 실행할 수 있도록 한다.<br>
그런데, 여기서 아무리 첫줄부터 실행을 하더라도 조건이있는 이벤트들(특정영역 클릭, 몇초이후 실행 등등)은 아무리 그 시간이 짧아도 무조건 대기실행이라는 것이다.<br>

따라서 위의 코드는 이렇게 된다.<br>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFMficz0k3_jIf9VBogIrH8QYcKO6D3pwztt433r9AYOawLmEL82FurYnjyI7t3S6zUD0VbWo5qEBwSpuj-eA1PSatQh8q-mX11CzGnUkzUCrlLaVhlVDftnCWdvKnO2iEwKo9lQkS_Bsab43rWaYG7b-RbeBFDZjbR0Y5pnsCSpxUqlbPPFMuDirO/w739-h245/%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C.png" />

### Synchronous
위와 같이 가벼운 함수들이 빨리 처리되는것을 동기[Synchronous]적 처리라고 하고
동기적 언어는 그냥 한번에 한줄의 코드가 실행되는것을 의미한다.

### Asynchronous
함수들을 대기 시켰다가 처리되는것을 비동기[Asynchronous] 처리라고 한다.
한번에 한줄의 코드가 실행되지 않고, ~~했을때, 특정 시간 이후에 실행이되는것을 의미한다.
따라서, 오래걸리는 작업을 settimeout으로 잡아두면 비동기식 처리가 될 수 있고,
혹은 eventlistener등을 활용하여 비동기 처리를 할 수 있다.

따라서 자바스크립트의 비동기, asychronouse라는 것은 오래걸리는것을 멈춰놓는 함수들에 있다. 또한, 비동기로 만드는것이 아닌 단순하게 아닌 순서를 잡기 위해 디자인 패턴을 아래와 같이 진행해도 되긴한다.

```js
 first(function(){
       second(function(){
            third(function(){
             });
       });
 });
```

그러나, 위와같은 패턴을 직접적으로 사용하는것 보다는 promise라는 방법을 사용한다.

### promise
promise는 특이한 오브젝트에 가까워서 다음과 같이 사용해야한다.
```js
var first =  new Promise(function(){});
```
위와같은 promise는 true와 false의 함수만 반환하게 된다. <br>
따라서 콜백함수로 들어올만한 파라미터 값이 두개가 필요하다. <br>
파라미터의 이름은 상관이 없지만 통장적으로 아래와 같이 설정한다.
```js
var first =  new Promise(function(resolve, reject){});
```
앞쪽 파라미터인 resolve는 성공했을때 , 즉 then을 사용할때 노출되는 함수이고, <br>
reject는 실패했을때 즉, catch를 사용할때 노출될 함수라고 보면 된다.<br>
만약, 아래와 같은 버튼이 있다고 가정해보자.
```html
<button>성공</button>
<button>실패</button>
```
위쪽 버튼 클릭시 성공반환, 아래쪽 버튼 클릭시 실패를 반환한다면 코드는 아래와 같이 될것이다.
```js
var btn = document.querySelectorAll('button');
var first  = new Promise(function(resolve,reject){
  btn[0].onclick=function(){
    resolve();
  };
  btn[1].onclick=function(){
    reject();
  };
});
```

promise에서 성공과 실패를 가늠하는 방법은 .then과 .catch이다. <br>
성공하면 .then의 콜백함수가 실행, 실패하면 .catch의 콜백함수가 실행되므로 다음과 같이 작성될 수 있다.
```js
first.then(function(){
  console.log('성공');
}).catch(function(){
  console.log('실패');
});
```

이런 promise 함수는 ajax를 사용할때 용이하다. <br>
jquery의 ajax함수 자체가 지금 이 promise와 비슷하다고 볼 수 있다.