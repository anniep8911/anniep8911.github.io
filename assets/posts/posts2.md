# 아이콘 자동 빌더

1. 프로그램 사용 목적 

: 해당 프로그램은 figma에서 json타입으로 제공하는 아이콘에 대해서  figma의 base64컨버팅 된 이미지를 SCSS믹스인을 활용해서 쉽게 사용할 수 있도록, 각각 SCSS 변수 /  HMTL 타입의 가이드를 제공하는 프로그램이다.

1. 프로그램 사용 시 기대 효과 

: figma의 이미지다운 > base64 컨버팅 과정에서의 시간 단축  및 아이콘 가이드화(html)를 통해 간단하게 사용하여 업무 처리 시간을 단축한다 (예상 단축시간 : 1min per action) 

1. 로직 워크플로우 
    1. figma에서 base 64컨버팅 내용을 Json타입으로 저장한다.
    2. json파일을 만든다 
    3. json타입에 대해서 각각 이름, base64코드, width,height값을 가공한다.
    4. 가공한 뒤 html, scss파일로 각각 뱉어내도록 file write한다.

1. 프로그램 개발환경
    1. node version : 14.17.0
    2. dependences: none

1. 프로그램의 효과 
    
    : dependence없이 node 작업만 바로 가능하므로, 노드 버전에도 문제가 없음. 특정 환경이 node설치 외 필요한 것이 없음.
    
2. codes

```jsx
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require('fs');
// 불러올 svg json file
const icon =  require('./_icon_assets.json');
let replaces= /.png|.jpg|.gif|.svg|/g;

let [strsss,strsssData,stwidth,stheight]= [[],[],[],[]];

function dataMakers (a,b,c,d){
    strsss.push(a);
    strsssData.push(b);
    stwidth.push(c);
    stheight.push(d);
}

function iconMaker(){
    let [strs,width,height] = ['','',''];
    Object.keys(icon).forEach(e=>{
        dataMakers(`'${e.replace(replaces,'')}'`,`'${icon[e].data}'`,icon[e].width,icon[e].height);
        strs+=(`${ e.replace(replaces,'')}:'${icon[e].data}',\n`);
        width+=(`${ e.replace(replaces,'')}:${icon[e].width},`);
        height+=(`${ e.replace(replaces,'')}:${icon[e].height},`);
    });
    return `$icons:(${strs}); \n $icons-width:(${width}); \n $icons-height:(${height});`;
}

function iconGuid(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>아이콘 가이드!</title>
    </head>
    <body>
        <p>적용방법 내,icon mixin사용 시 아이콘 명 뒤 , 로 width, height값이 순서로 들어오면 사이즈 조절가능 (px제외하고 자연수만 입력) <br> 예) @include resets.icon('system_back',80,100)</p>
        <table>
            <thead>
                <th>아이콘명</th>
                <th>이미지</th>
                <th>적용(SCSS)</th>
                <th>copy</th>
                <th>적용(Html)</th>
                <th>copy</th>
            </thead>
            <tbody>
                
            </tbody>
        </table>
        <script>
            let strsss  = [${strsss}];
            let strsssData  = [${strsssData}];
            let stwidth  = [${stwidth}];
            let stheight  = [${stheight}];
            
            let tb = document.querySelector('table tbody');
            let th = document.querySelectorAll('table thead th');
            let tr = document.createElement('tr');
            let td = document.createElement('td');

            strsss.forEach((e,i)=>{
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let td6 = document.createElement('td');
                tb.append(tr);
                tr.append(td);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                tr.append(td5);
                tr.append(td6);
                td.innerHTML = e;
                td2.innerHTML = \`<i class=\"\$\{\e\}" style="background-image: url('data:image/svg+xml;base64,\${strsssData[i]}'); width:\${stwidth[i]}px ;height:\${stheight[i]}px; display:inline-block"\></i>\`;
                td3.innerHTML = \`<input type="text" id="copytxt" value="@include resets.icon('\${e}');">\`;
                td4.innerHTML = \`<button class="copy">카피하기!</button>\`;
                td5.innerHTML = \`<input type="text" id="copytxt2" value="&lt;i class=&quot;\$\{\e\}&quot;&gt;&lt;/i&gt;">\`;
                td6.innerHTML = \`<button class="copy2">카피하기!</button>\`;
            })

            const copyBtn = document.querySelectorAll('button.copy');
            const copyBtn2 = document.querySelectorAll('button.copy2');
        

            copyBtn.forEach((e,i)=>e.addEventListener('click',()=>{
                const content = document.querySelectorAll('#copytxt'); 
                copy(content[i]);
                
            }));
            copyBtn2.forEach((e,i)=>e.addEventListener('click',()=>{
                const content = document.querySelectorAll('#copytxt2'); 
                copy(content[i]);
                
            }));
            
            function copy(content){
                content.select();
                document.execCommand('copy');
            }

        </script>
    </body>
    </html>
    `;
}

// writeFile('파일명',고정);
fs.writeFile('_icons.scss',iconMaker(), function (err) {
   if (err) throw err;
   console.log('변수가 성공적으로 저장되었습니다!');
});
fs.writeFile('icon_guid.html',iconGuid(), function (err) {
   if (err) throw err;
   console.log('변수가 성공적으로 저장되었습니다!');
});
```

1. asset json데이터 구조 

```json
{
  "system_system_back": {
    "mimeType": "image/svg+xml",
    "data": "PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS41MzEzIDMuOTY5NjdDMTEuODI0MiA0LjI2MjU2IDExLjgyNDIgNC43Mzc0NCAxMS41MzEzIDUuMDMwMzNMNS4zMTE2NCAxMS4yNUgyMC4yNzEyQzIwLjY3NDMgMTEuMjUgMjEuMDAxIDExLjU4NTggMjEuMDAxIDEyQzIxLjAwMSAxMi40MTQyIDIwLjY3NDMgMTIuNzUgMjAuMjcxMiAxMi43NUg1LjMxMTY0TDExLjUzMTMgMTguOTY5N0MxMS44MjQyIDE5LjI2MjYgMTEuODI0MiAxOS43Mzc0IDExLjUzMTMgMjAuMDMwM0MxMS4yMzg0IDIwLjMyMzIgMTAuNzYzNSAyMC4zMjMyIDEwLjQ3MDYgMjAuMDMwM0wyLjk3MDY1IDEyLjUzMDNDMi42Nzc3NSAxMi4yMzc0IDIuNjc3NzUgMTEuNzYyNiAyLjk3MDY1IDExLjQ2OTdMMTAuNDcwNiAzLjk2OTY3QzEwLjc2MzUgMy42NzY3OCAxMS4yMzg0IDMuNjc2NzggMTEuNTMxMyAzLjk2OTY3WiIgZmlsbD0iIzIyMjIyMiIvPgo8L3N2Zz4K",
    "width": 24,
    "height": 24
  },
  "system_system_arrow_left": {
    "mimeType": "image/svg+xml",
    "data": "PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC41NjA5IDE4LjQ5ODNDMTQuMjg1NyAxOC44MDc5IDEzLjgxMTcgMTguODM1NyAxMy41MDIxIDE4LjU2MDVMNy41MDIwOSAxMy4yMjcyQzcuMzQ0OTIgMTMuMDg3NSA3LjI1MzYyIDEyLjg4ODIgNy4yNTA0NCAxMi42NzhDNy4yNDcyNyAxMi40Njc3IDcuMzMyNTEgMTIuMjY1OCA3LjQ4NTM5IDEyLjEyMTRMMTMuNDg1NCA2LjQ1NDczQzEzLjc4NjUgNi4xNzAzMiAxNC4yNjEyIDYuMTgzODkgMTQuNTQ1NiA2LjQ4NTAyQzE0LjgzIDYuNzg2MTYgMTQuODE2NSA3LjI2MDg0IDE0LjUxNTMgNy41NDUyNUw5LjExMDQgMTIuNjQ5OUwxNC40OTg2IDE3LjQzOTRDMTQuODA4MiAxNy43MTQ2IDE0LjgzNjEgMTguMTg4NyAxNC41NjA5IDE4LjQ5ODNaIiBmaWxsPSIjMjIyMjIyIi8+Cjwvc3ZnPgo=",
    "width": 24,
    "height": 24
  },
  "system_system_arrow_right.svg": {
    "mimeType": "image/svg+xml",
    "data": "PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjQ2MTU4IDUuNDc3ODlDOS43NDk5MyA1LjE4MDUzIDEwLjIyNDcgNS4xNzMyMiAxMC41MjIxIDUuNDYxNThMMTYuNTIyMSAxMS4yNzk4QzE2LjY2NSAxMS40MTgzIDE2Ljc0NjkgMTEuNjA3OSAxNi43NDk5IDExLjgwNjhDMTYuNzUyOSAxMi4wMDU4IDE2LjY3NjggMTIuMTk3OCAxNi41MzgyIDEyLjM0MDVMMTAuNTM4MiAxOC41MjI0QzEwLjI0OTcgMTguODE5NiA5Ljc3NDg4IDE4LjgyNjcgOS40Nzc2NCAxOC41MzgyQzkuMTgwNDEgMTguMjQ5NyA5LjE3MzMzIDE3Ljc3NDkgOS40NjE4MiAxNy40Nzc2TDE0LjkzOTIgMTEuODM0M0w5LjQ3Nzg5IDYuNTM4NDNDOS4xODA1MyA2LjI1MDA3IDkuMTczMjIgNS43NzUyNiA5LjQ2MTU4IDUuNDc3ODlaIiBmaWxsPSIjMjIyMjIyIi8+Cjwvc3ZnPgo=",
    "width": 24,
    "height": 24
  },
}
```

1. 패키지 사용 예시 미리보기 
2.