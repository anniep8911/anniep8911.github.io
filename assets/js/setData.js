import {getData,dataLoading} from './model.js';
import {uiWorks,chatBot} from './main.js';

getData('./assets/data/data.json').then(async res=>{
    let prd = await dataLoading(res.projects);
    const cont01Prd = document.querySelector('.cont01 .projects');
    const cont02Prd = document.querySelector('.hdr-exp p');
    let totalHash = [];

    prd.forEach((p,i)=>{
        let hashes = [];
        p.hashes.forEach((e)=>{
            hashes.push(` <span>#${e}</span> `)
            totalHash.push(e);
        });

        let addPrd = `<article data-month=${p.month} data-year=${p.year} data-cat="${p.company}"  data-hasy="${p.hashes}" data-show="show">
                        <div class="image" style="background:url('${p.icon}') #fff no-repeat center left; background-size:contain">projects image</div>
                        <div class="texts">
                            <h3>${p.name}</h3>
                            <h4>${hashes}</h4>
                            <div class="months">${p.month}</div>
                            <div class="stmonth">1</div>
                        </div>
                    </article>`;

        cont01Prd.innerHTML += addPrd;
        prd.hashes= hashes;
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
        let sp = document.createElement('span');
        sp.innerHTML = `<a href="https://www.npmjs.com/package/${pkname}" target="_blank">${pkname} <strong></strong> ${dw}</a>`;
        let i = sp.querySelector('strong');
        let box =  Math.round(dw/100);
        Array(box).fill(0).forEach(()=>{
            i.innerText += '▮';
        })
        document.querySelector('.hdr-exp p.npm').append(sp);
    })
    .catch(() => {});
});