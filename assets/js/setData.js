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

    totalHash= new Set(totalHash);
    totalHash.forEach((e)=>{
        let sp =  document.createElement('span');
        sp.innerText =  e;
        
        cont02Prd.append(sp);
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