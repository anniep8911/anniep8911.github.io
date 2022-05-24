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


## this
위에 작성한 내용 중 function(){}과 ()=>의 this가 차이가 나기때문에 완벽히 function을 압축한것이 ()=> 화살표 함수가 아니라고 이야기하였는데, 
그러면, 이 this는 무엇일까?

### window
this키워드의 첫번째 뜻은 window를 의미하며, 스크립트 최상단에 use strict를 쓰면, 엄격하게 실행 할 수 있다. <br> 
strict를 실행하는 순간부터 함수 안의 this는 파악할 수 없는 것으로 정의되니 유의하자.
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEg_a5wdUeOu-IjVzOq5KFIIeuerkhpfMVK40wjby8t0gjiRqNrZilv8jElo_yKmb0-OFr439Og8Za9AaVzwYfMPxA1suVZeSNqh18xzf8oL5_x-m3BQOjt1CmgTSLXOp4xk9qayobqT6aihuSXx7IT7pHAR2VQqh6xjOknsgbQKipRbFteBrGU0BgOD"/>
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEh4KdTe2SN4lLng6y0kG-NXnonhMi3q3iJEGbERcD3U2_gSN3aLcu5jYXKZYHeuhOBLJNjhG3m3RPOjS_evaK859uJ5lJZBO1ccBYkiDtvbsMvOP8d-0MVynwGITX5iImVfmWgazvu75sjkByxuF9IvBff7jOCUB0N11pDJRyJoi6fTUaQmaZPczLEe"/>
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEjAD6YHr0bURyLam_FK_jRourcGob7sy6ddmphbDsmKo6_csNNF1gtgGZwtUQBxAzX_DBJOjGSD-NN_J_OlK8qqcB_LKI28i2aNkboyp4VULis9BRJv_m9vXAmzvQyw2Mu1vlGg_eh_AN4YevvwEgsspsp90Pn1uawhDqpSh2P6ld3egY_c7Q5kIgcF" />
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEiYNm5He0JUHKG1PNBARbgVI4m3JfLsIOvoHDwll3xuYLOdgBPXxw33_mrsZdZiLZPnTcb3syDVy7fm5GtCK2wtBDAtNgyaFPqKOvxenelqNBtShPEHZiTkOB20d9vZR8LlAPn8D8Twh7WviDKvlngKATCSlMbY1YgYvHmmb8qaeB-_U_etg3AD9tgW"/>



### method안의 object
아래와 같은 object안에 포함된 함수가 있다고 보면, object안에 메소드가 동작하는 object를 의미한다.
```js
var obj= {data:'value', function(){this}};
```

```js
var obj = {val:'value',fn:function(){ console.log(this)}};
obj.fn();
```

(요새는 object안에 함수를 입력할 경우 function에 이름이 없어도 된다.)<br>
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEgCZG2JqZsxunwjwx78rn43UH7JzkotKKBQ-dE9uoBZevXO2D9VplKsRF--Tzwdw_cDqmXYnOmVMA-7u1XX1US73Qk416kSn52oz-3iKyPWPNz1EKPMNjynj9Sx_dJ3SZaLBl1Z5J_29PIM1amiCWZdSlZl8YZf0hwfyYglc6OKBjMyv5SrU1KPzbuh"/>
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEiTTP5UODaF9g_VpDgnmOWEyj6xchcCCzBqDcmGjOTJOPkMV73jOX8xXOz50Ab-up58krAyy4J2r7Yt5Laj8IhnXYXl_z6dtwnCQwM4oqp5axA6cgDg8gFZZvTBp0VaqikCzbnJfFq4VZZnogZ0e2xkkqTN71z-Tdf5B76zZdh8QLNNhJ2yRlSkZMT-"/>

arrow function의 경우에는 this의 값을 최상위에서 물려받아 쓰게된다.
```js
var obj = {val:'value',fn:()=>{ console.log(this)}};
obj.fn();
```
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEgrevKRnkTCpI3Xr5R0M-aIF00496klU1HkHgnGbbt9fhots2rgcd8Kl6zs2QqTcFIVziRA12dVMUU24olOz2D0iGBg1Kp_61-KZBnh1YDKLZMbYwG9yfJMIDg86OA1Ki6c9PnUiyaUhBMT496I6jcAdf7N2M7bzZWj54HwzSonyAMKCRpV4QeVnpVV" />

### instance
aa라는 함수로 부터 생성되는 새로운 값을 obj에 object형식으로 담아준다. 
```js
function aa(){
    this.nameOn = 'alala';
    this.good = 'test02';
    this.hey = 'test03';
}
var obj= new aa();
console.log(obj);
```
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEh03gDyGmYBO4oeuECS_5_9y4rs0snBrrofZq872SSQHPtBjc8cHXfB-N3skMmxWGZ9wT9ij9CFtY4CU3jLlVg1sHcWxaDSwYz_XYumlMusU7SCnHGLs5JLyDWRA10mgWaJONo0AnrK3-9Yo_9YyrWPNqWLTAGVMwV13og6B06hOqxIIoKFuQsVWHhG" />



### dom
dom 탐색 후 function의 this는 탐색한 dom을 의미한다.
```js
window.onload=function(){
  document.querySelectorAll('button')[0].onclick=function(){
    console.log(this);
  }
}
```
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEhgwbeaGUZxzcZ4QxHCr-HVl7sQfpQJN13xLx8sR2t76fEupjuy2w1rue5l-023NiJLFeyUMLrFZgITFtVE9JIN9BAXiIKkfLyr2HwdhYJphmNrxkbmX1qrHhEWjBOlDBqJ_oWNeUqG4uIYYzyx5s7SUOgwcPE4k5SVbm89iq2TtYFHIAihPITYsRL4" />


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
