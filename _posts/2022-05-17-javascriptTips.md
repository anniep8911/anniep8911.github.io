---
layout: post
toc: true
title: "동적요소 구현로직 및 코드"
categories: junk
tags: [javascript]
author:
  - 박정아(Annie Park)
---



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
### logic
아코디언의 경우 타이틀을 클릭할때마다 아래 내용이 나타나는 구조이기때문에, addClass와 removeClass를 활용한 로직을 짜고, 동적요소 자체는 css가 적용되면서 움직일 수 있도록 구현한다.
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEjvLKjj8eOxlC1PMMjwHvbWstkip24iZRitkT3XiLy9YJ9ZoC7gxi-w9muNhswySKyKNnOQd4xcfdJoC9knA54iXB5ZemE0iv71WW2RancBU40WYDE2uKiZC5JK7XNDXQ-zkTq5gTdi3Wsmvj1qrihe1CypkUTBNou7Q-XygOBo72syYIanD17ystd2=w627-h315">

### code
```html
<ul>
    <li>타이틀</li>
    <li>내용</li>
    <li>타이틀</li>
    <li>내용</li>
    <li>타이틀</li>
    <li>내용</li>
</ul>
```

```css
ul{
    width: 500px;
}
li:nth-of-child(odd){
    line-height : 40px;
}
li:nth-of-child(even){
    height: 0px;
    overflow: hidden;
    transition : height 0.5s;
}
li.show+li{
   height : 200px;
}
```

```js
$('li').even().click(function(){
    $('li').removeClass('show');
    this.addClass('show');
});
```


## touch(swipe action)
### logic
event method중 touchstart, touchend를 활용하여, 위아래 스크롤용 터치인지, 좌우 스와이프 터치인지 구분한다.<br>
우선 changetouch.screen값을 활용하여 터치가 시작될 시점의 가로, 세로 기준의 터치좌표와 끝날 시점의 가로, 세로 기준의 터치 좌표를 알아낸다.<br>
그다음 시작터치의 Y좌표를 확인하여(위아래) 범주가 10px내에 있다면(작다면) 위아래 스크롤을 위한 터치가 아닌 좌우 스와이프로 간주했다. <br>
그리고 만약 시작점이 끝점보다 작다면 , 오른쪽 으로 슬라이드가 이동 된다고 간주했으며, 반대의 경우 오른쪽 슬라이드라고 간주했다. (crousel 참고) <br>
<img src="https://blogger.googleusercontent.com/img/a/AVvXsEhAkqs2m_9Xj6VWT05BrDlbgdENt5iqA78DxA3cN8ltxSBnjuSvwPq21dvuvpe53yG2ir72tFjFCOdPoXaJjWfQh0ScG3H4WnThNd-J7JFciVuHyPY0jFYCjOt69ofC-szivauEyelu0mOM1uGY6B46lQK2B-H429Dpqz8RAGc274SNTyptiZu8V2i1=w272-h355" />
### code

```js
artGr.forEach((e,i)=>{
    let [stX,stY,edX,edY] =[0,0,0,0];
    e.addEventListener('touchstart',function(ev){
        stX = ev.changedTouches[0].screenX;
        stY = ev.changedTouches[0].screenY;
    },false);
    e.addEventListener('touchend',function(ev){
        edX = ev.changedTouches[0].screenX;
        edY = ev.changedTouches[0].screenY;
        if(stX>edX && Math.abs(stY-edY)<=10){
            leftSlide();
        }else if(stX<edX && Math.abs(stY-edY)<=10){
            rightSlide();
        }
    },false);
});
```


