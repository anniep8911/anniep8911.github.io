import {getData,dataLoading} from './model.js';
import {uiWorks,chatBot} from './main.js';
import fire from './firebase-init.js';

getData('./assets/data/data.json').then(async res=>{
    let prd = await dataLoading(res.projects);
    const cont01Prd = document.querySelector('.cont01 .projects');
    let totalHash = [];

    prd.forEach((p,i)=>{
        let hashes = [];
        p.hashes.forEach((e)=>{
            hashes.push(` <span>#${e}</span> `)
            totalHash.push(e);
        });

        let art = document.createElement('article');
        art.className = `project`;
        art.setAttribute('data-month', p.month);
        art.setAttribute('data-year', p.year);
        art.setAttribute('data-cat', p.company);
        art.setAttribute('data-hasy', p.hashes);
        art.setAttribute('data-cat2', p.path);
        art.innerHTML = `
                        <div class="image" style="background:url('${p.icon}') #fff no-repeat center left; background-size:contain">projects image</div>
                        <div class="texts">
                            <h3>${p.name}</h3>
                            <h4>${hashes}</h4>
                            <div class="months">${p.month}</div>
                            <div class="stmonth">1</div>
                        </div>`;
        cont01Prd.append(art);
        prd.hashes= hashes;
    });

    // 데이터셋(dom 추가) 후 탐색
    let prj = document.querySelectorAll(".project");

    // 모든 프로젝트 카드에 클릭 이벤트 연결
    prj.forEach((el) => {
      el.addEventListener("click", () => {
        const projectId = el.dataset.cat2;
        fire.cntUpdate('projects',projectId);
      });
    });

    
    prj = Array.from(prj);
    fire.ranking(5, (rank) => {
        const ranks = document.querySelector('.ranks');
        // 실시간 업데이트 초기화
        ranks.innerHTML = '';       
        rank.forEach((e, i) => {
          const matchPrd = prd.find(el => el.path === e.id);
          if (!matchPrd) return;
      
          const ele = document.createElement('p');
          ele.innerHTML = `
            <i>${i + 1}</i>
            <span>${matchPrd.name}</span>
            <span>${e.clicks}회</span>
          `;
      
            // 팝업용 속성
          ele.setAttribute('data-name', matchPrd.name);
          ele.setAttribute('data-year', matchPrd.year);
          ele.setAttribute('data-company', matchPrd.company);
          ele.setAttribute('data-month', matchPrd.month);
          ele.setAttribute('data-path', matchPrd.path);
          ele.setAttribute('data-goal', matchPrd.goal);
          ele.setAttribute('data-hashes', matchPrd.hashes);
      
          ranks.append(ele);
        });
      });
      
    // UI함수 실행
    return uiWorks(prd);
});


getData('./assets/data/que.json').then(async res=>{
    let prd = await dataLoading(res.questions);
    const resQue = document.querySelector('.robot-response .others');
    prd.forEach(e=>{
        resQue.innerHTML += `<span>${e.que}</span>`;
    });
    // UI함수 실행
    return chatBot(prd);
})

// 방문자 카운트 실행 
fire.cntUpdate('stats','visits');
// 방문자수 확인 및 세팅 
fire.getVisit((data)=>{
    const dts = document.querySelectorAll('.cnts p');
    const cat= ['total','today'];
    dts.forEach((e,i)=>{
        let dt = data[cat[i]];
        e.querySelector('.val').textContent = `${dt}명`;
        dt = Math.round(dt/10);
        !dt?dt=1:'';
        Array(dt).fill(0).forEach(ee=>{
            let ele =  document.createElement('i');
            e.querySelector('.icons').append(ele);
        })  
    })
});




// npm패키지 다운로드 확인
const today = new Date().toISOString().slice(0, 10);
const packages = [
    // 패키지 이름과 출시일 조정
  { name: 'scss-cleans', id: 'scss-cleans-count', start: '2023-10-18' },
  { name: 'style-crawl', id: 'style-crawl-count', start: '2024-01-01' } 
];

packages.forEach(pkg => {
  const url = `https://api.npmjs.org/downloads/point/${pkg.start}:${today}/${pkg.name}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
        let dw =  data.downloads.toLocaleString();
        let pkname = data.package.toLocaleString();
        let sp = document.createElement('p');
        sp.innerHTML = `
        <a href="https://www.npmjs.com/package/${pkname}" target="_blank">
            <span>${pkname}</span>  
            <span>${dw}</span>  
            <span class="prog"> <i></i> </span></a>`;
        document.querySelector('.hdr-exp .npm').append(sp);
        sp.querySelector('i').style.width = `${dw / 10}%`
    })
    .catch(() => {});
});



    