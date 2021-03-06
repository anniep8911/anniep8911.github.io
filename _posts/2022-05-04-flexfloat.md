---
layout: post
toc: true
title: "Float와 flex 그리고 position"
categories: junk
tags: [css]
author:
  - 박정아(Annie Park)
---

## 정렬하는 방법
float, flex가 필요한 이유는 바로 "블록요소"를 내가 원하는 위치에 놓기 위함이다. <br>
특히, float와 flex는 블록요소를 마치 inline요소와 같이 내가 원하는 곳에 '줄세워'두기 위함인데, 이 둘의 성격은 매우 다르다.

### 부유하는 float
float는 부유한다. <br>
무슨말인가 하니, float라는 속성을 적용하는 순간부터 붕붕떠서 float가 적용된 요소의 부모에게 높이가 없다면 갑자기 부모의 존재가 사라지는 것이다.float의 사용방법은 다음과 같다.
```html
정렬할요소{
    width: 400%;
    height: 100%;
    float: left;
}
```
기본적으로 모든 컨텐츠 내용은 왼쪽으로부터 오른쪽으로 흐른다. 따라서 float는 주로 left를 기준으로 잡아준다. 
만약 right를 선택한다면 html기준 첫째가 맨 오른쪽으로 가는 모습을 볼 수있다.<br>

이러한 float는 정렬속성으로 활용할때 큰 어려움은 없지만, 이름그대로 '부유'하기때문에 만약 이 정렬 요소의 부모요소가 사이트에서 중요한 유닛이라면 부모요소의 높이가 사라지게 된다.
이에 관련한 해결 방안은 두가지가 있다.
1. 부모의 요소에 높이를 강제로 준다.
2. 부모요소에 가상요소를 만들고 아래와 같이 가상요소에 대해서 float를 풀어준다 
```html
부모요소::after{
    content:'';
    display:block;
    clear:'both';
}
```
**위의 방법중 1은 완벽하게 해결되는것이 아니라 임시방편으로 적용되는 부분이라 추천하지 않는다.

### 블록요소 flex

flex는 부유하지 않는다. <br>
flex는 정렬되는 요소가 아닌 그 부모를 선택해서 자식요소를 '정렬시키는' 방법으로 접근이 된다.
flex의 사용방법은 다음과 같다.
```html
정렬할요소의부모{
    display: flex;
}
정렬할요소의부모 .정렬할요소{}
```


또한, float의 경우 자식요소의 너비값이 부모요소의 너비를 넘길때 자동으로 줄바꿈 처리가 되지만, 
flex는 부모의 너비값이 자식요소에게 영향을 끼치게 된다.<br>
이럴땐 아래와 같은 요소를 추가하면 부모 기준보다 자식의 합이 넘칠때 다음줄로 자동이동 하게된다.
```html
정렬할요소의부모{
    display: flex;
    flex-wrap: wrap;
  
}
```


## 위치를 마음껏
### 부유하는 position
position속성은 속성 값에 따라서 다음과 같이 나누어볼 수 있다.
<dl>
<dt>position : relative</dt>
<dd>- 현재 위치한 내용 그대로 부유만 시킨다.</dd>
<dt>position : abolute</dt>
<dd>- 부모요소 기준으로 좌표를 찍어서 갈 수 있다. (기준: left , right, top, bottom)</dd>
<dt>position : fixed</dt>
<dd>- ViewPort 기준으로 좌표를 찍어서 갈 수 있으며, 고정된다 (기준: left , right, top, bottom)</dd>
<dt>position : sticky</dt>
<dd>- ViewPort 기준으로 좌표를 고정시킬 수 있으며 같은 속성을 가진 다음 요소가 나올때까지 고정된 좌표가 유지된다. (기준: left , right, top, bottom)</dd>
</dl>