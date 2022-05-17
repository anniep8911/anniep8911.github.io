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
parameter는 마치 자판기에 넣는 동전과 비슷하다고 생각할 수 있다.<br>
자판기에 500원짜리가 들어왔을때, 500원짜리 콜라를 보내주는 함수를 작성했다고 가정하면,
500원 이라는것이 파라미터 값으로 '입력'되었을때 사용되는것이 파라미터라고 볼 수 있다.<br>

```js

    function 자판기(넣은돈){
        if(넣은돈  == '500원'){
            return 콜라;
        }else{
            return 물;
        }
    }

    자판기('500원');
```

이러한 parameter는 이벤트의 경우 이벤트가 발생한 돔 그 자체를 의미할수도있고, 입력받은 값을 내가 마음데로 사용할 수도 있다.<br>
여기에는 직접적으로 값을 입력할수도있지만, '변수'에 값을 담고 변수를 활용할 수도있는데,
이때 활용되는 변수를 다음과 같이 나눠볼 수 있다.

### primitive data
변수타입중 다음과 같은 일반 변수를 의미한다
```js
var 변수 = 1234;
var 문자 = '안녕하세요';
```

### reference data 
변수 타입중 배열과 오브젝트를 의미한다.
```js
var arr = [1,2,3];
var obj = {1:1,2:2,3:3};
```

### 차이점
둘의 차이는 데이터를 직접적으로 저장하는가와 데이터가 어디에 위치해 있는가에 대한 차이이다. <br>
일반 변수에 들어간 숫자나 문자는 변수 그 자체에 바로 데이터를 저장한것이고, 변수에 들어간 오브젝트나 배열의 값을 그 변수의 위치를 의미한다.
따라서 아래와 같은 코드의 경우 
```js
 var 이름1 = {name: '김'};
    var 이름2 = 이름1;
    이름1.name = '박';
    console.log(이름2);
```
아래와 같은 결과를 만들어 낸다. <br>
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEg6gi92L2AR0C3agn5nfw8hm0QWkMGdhh3ZYSr09eXlEpj5T4I9IawNs8AdWThXLVJBLAfZCJhQem7NiZnXZokUsUp-O80fsMsN0fSq7Cms01gO87CwSd-DfjHJws7g7DdpsKlCPhO6EHdUSJGLMRXtsfQha6zD8By6mftUhjJxm_IS8PIedVp9V6PI=w473-h136"><br>
위와 같은 결과가 발생한이유는 이름2에는 이름1의 값이 아닌, 이름1이 가르키는 주소를 저장했기때문이다.<br>
따라서, 다음과 같이 이름1, 이름2에 똑같은 값을 줘도

```js
var 이름1 = {name: '김'};
var 이름2 ={name: '김'};
```
말그대로 위치가 저장되는 것이기때문에 이름1에는 이름1의 위치, 이름2에는 이름2의 위치가 저장된다. <br>
그러면, 아래와 같은 함수를 거친다면 어떻게 될까??
```js
var 이름1= {name : '김'};
function 이름체인저(obj){
    obj.name = '오';
}
이름체인저(이름1);
```
아마 이름1의 name이 '오'로 변경되어있을것이다.
```js
var 이름1 = ['김'];
function 이름체인저(arr){
    arr=['오'];
}
이름체인저(이름1);
```
위의 함수를 거진차면 이름1의 값은 변경되지 않고 arr이라는 새로운 변수가 '오'라는 값을 배열로 갖게 될것이다. 오브젝트, 배열타입의 데이터는 이와같이 '위치의값'을 저장한다.


### spread operator
array사용시, 배열 자체를 제거하고 나열해주는 방법이다. 표현법은 ... 이다. <br>
```js
var arr=[1,2,3,4,5];
console.log(...arr);
```
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEiMZOTg4g0eGY8Anf2qCPgsbK4edNaC2JDvv7yP0D9TtsNNk7BUBZCULzAmywEtNTtAMREw5I-zpyRIsIIyfuN0SM6yLqe31qCCVHcW0rrjgr2sO_7oOotfj5A4Dz6h20NZNJU9B0XRbzot8HnJswsJrelyzEDFwXiHeEqy4htnWIsdE53qEWk9-NGt"/>

문자 spread시 문자를 한글자씩 해체시켜 나열해준다.<br>
**문자는 array는 아니지만, array와 비슷하게 나눌 수 있기때문에 spread를 활용하면 펼쳐서 보여준다.

```js
var arr='hello';
console.log(...arr);
```
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEgCoSGxygGaHPCe6jvIWb2gb7kaFczMbGO50sWJyzHX8NIa7oljYUG_KRKf_d0AKCuffLvs0olGKpXXnrElRdD-Y4T8656I7uuCE0Zs3AJq4YOHuGMY4S5rGvqcM_MEKCxXQCWvQnqQApnkFxys8aJwFDTe33tMNHHqHf0M8gE0aQqmXEIeYnrCb6VM" />
array자체를 합치거나 복사할 수 있다.
```js
var a =  'hello';
var b = [4,5];
var c = [...a,...b];
console.log(c);
```
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEgPWMHUGXhuMmvXrTXaz1X7iDkikwfQvEcqqZTWW55pNu4E-ub4V2zAk2kHHr2hiMi2amteHeg8n9IQ16MNGYHmCjt9klWw1JGOt7gKhGkT2Umz-mRijn71euNpw7D0o4t20mYNCz2D9yEGB8vRr-0uQpJph5HWq4c5nTaYMQahKslLKnCGvfEObgMR" />

#### deepcopy
이러한 spread는 deepcopy를 하고싶을때 사용한다. (array 복사 자체를 독립적으로 만들고 싶을 때) <br> array와 obj는 일반적으로 카피할경우 공유가 일어나기때문에[reference data 부분 참조!]
반드시 deepcopy가 필요하다.
```js
    var a = [1,2,3,4,5];
    var b = [4,5];
    var c= [...a];
    a[4]=4;
    console.log(a);
    console.log(c);
```

#### 오브젝트의 중괄호 해체
또한 아래와 같이 오브젝트의 중괄호를 해체하는 역할도 한다. <br>
```js
var obj={ a:1, b:2, c:3};
var obj2={d:4};
var obj3={...obj,...obj2};

console.log(obj3);
```

만약, 아래와같이 중복값이 발생된다면 
```js
var obj={ a:1, b:2, c:3};
var obj3={a:9,...obj};
console.log(obj3);
```
뒤에 오는 값이 최종값으로 설정된다.

#### parameter에 사용하는 방법
아래와 같이 parameter에 넣을 때 사용하기도 한다.
```js
var arr=[1,2,3];

function fn(a,b,c){
console.log(a+b+c);
}

// 원래 넣는방법
fn(arr[0],arr[1],arr[2]);
// spread 활용
fn(...arr);
```









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