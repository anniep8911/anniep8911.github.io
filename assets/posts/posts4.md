# build-maker

1. 프로그램 사용 목적 
    
    : webpack에 설정 된 파일 경로를 자동으로 찾아줌 
    
2. 프로그램 사용 시 기대 효과 
    
    : 파일작업 > 파일명 config에서 검색 > 빌드를 위한 명령어 찾기 > webpack.config에 빌드 명령어 치기 의 플로우 중 ,  파일명 config에서 검색 > 빌드를 위한 명령어 찾기 > webpack.config에 빌드 명령어 치기 과정이 사라져 업무의 속도를 상승 시킬 수 있음 (1개 작업 당 2분이상 절감효과)
    
3. 로직 워크플로우 
    1. 파일 작업 후 path를 가지고있는다 
    2. path를 전체 config에서 검색한다 
    3. config에 적용되어있는 파일중에서 : 을 가지고있는 오브젝트 키 값을 찾는다 
    4. 키 값을 반환하고, 해당 파일이 css면 css기반 명령어 세팅을 js라면 js기반 명령어 세팅을 한다 
    5. webpack.cofnig파일에 해당세팅내용을 override시킨다.
    
4. 프로그램 개발환경
    1. node : 14.17.0
    2. dependences: none
    
5. 프로그램의 효과 
    
    : 작업한 파일의 빌드 값을 빠르고 명확하게 찾을 수 있음 
    
6. codes
    
    ```jsx
    const fs = require('fs');
    const readline = require('readline');
    const rl = readline.createInterface({input: process.stdin,output: process.stdout,});
    let buildFiles = [];
    let fileRd = [
        'css/personal/components/notification'
    ];
    
    fs.readFile('./css-config.js','utf-8',(err,dtP)=>{
        err? console.log('css-config없음. 위치 명확하게 해주세요!'):dtP;
        fs.readFile('./js-config.js','utf-8',(err,dtA)=>{
            let dt = dtP+dtA;
            fs.readFile('./webpack.config.js','utf-8',(err,dt2)=>{
                err? console.log('webpack.config.js없음 파일위치 명확하게!'):dt2;
                fs.writeFile(`./webpack.config.js`,findBuild(dt,dt2), (err)=>{ console.log('빌드파일 완료!'); rl.close(); if (err) throw err;});
            });
        });
    });
    
    const findBuild=(dt,reData)=>{
        let dts = dt.split('\n');
        let nowModule1 = '';
        let nowModule2 = '';
        let fnalDt =[];
        dts.forEach((e,i,a)=>{
            e.includes('Exports')&& e.includes('=') && !e.includes('let')?nowModule1 = e.slice(0,e.indexOf('=')).trim():'';
            e.includes(':')&&e.includes('Object.assign')?nowModule2 = nowModule1 + '.' + e.slice(0,e.indexOf(':')).trim():'';
            e.includes('=')&&e.includes('Object.assign')?nowModule2 = nowModule1:'';
    
            (!e.includes('//')&&e.includes(':')&&!e.includes('{')&& !e.includes('filename:')&& nowModule2!='' && !e.includes('path:') )?(e.includes('.scss')||e.includes('.js'))?buildFiles.push(nowModule2 + '**' + e.trim()):buildFiles.push(nowModule2 + '**' + e.trim() + a[i+1].trim()):'';
    
        });
        
        buildFiles = buildFiles.map(m=>(m.replace('(','')));
        
        fileRd.forEach(f=>{
            buildFiles.forEach(e=>{
                e.includes(f)? fnalDt.push(e):'';
            });
        });
    
        fnalDt = fnalDt.map(m=>m.slice(0,m.indexOf('**')).trim());
        fnalDt = fnalDt.map(m=>m+='\n');
        fnalDt = new Set(fnalDt);
        fnalDt = [...fnalDt].toString();
        reData = reData.split('\n');
        reData.forEach((e,i,a)=>{
            e.includes('module.exports')? a[i] += `\n${[fnalDt]}\n`:(e.includes('Exports.'))?a[i]='':a[i]+='\n'; 
        });
        reData= reData.filter(f=>f!='');
        return reData.join('');   
    };
    ```