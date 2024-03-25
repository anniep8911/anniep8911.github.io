import {getData,dataLoading} from './model.js';
import {uiWorks,chatBot} from './main.js';

getData('./assets/data/data.json').then(async res=>{
    let prd = await dataLoading(res.projects);
    const cont01Prd = document.querySelector('.cont01 .projects');
    const cont02Prd = document.querySelector('.cont02');

    prd.forEach((p,i)=>{
        let hashes = [];
        p.hashes.forEach((e)=>{
            hashes.push(` <span>#${e}</span> `)
        });

        let addPrd = `<article data-month=${p.month} data-year=${p.year} data-cat="${p.company}">
                        <div class="image" style="background:url('${p.icon}') #fff no-repeat center left; background-size:contain">projects image</div>
                        <div class="texts">
                            <h3>${p.name}</h3>
                            <div class="months">${p.month}</div>
                            <div class="stmonth">1</div>
                        </div>
                    </article>`;

        let addPrd2 = `<article data-cat="${p.company}">
            <div class="image"></div>
            <div class="texts">
                <div class="btns">
                    <div class="btn">${p.year}</div>
                    <div class="btn">${p.company}</div>
                </div>
                <h3>${p.name}</h3>
                <p>
                    ${hashes.join('')}
                </p>
            </div>
        </article>`;

        cont01Prd.innerHTML += addPrd;
        cont02Prd.innerHTML += addPrd2;
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