import fn from './funcs.js';
fn.setChart(['HTML', 'CSS/SCSS', 'JavaScript', 'Node.js', 'Vue.js', 'React.js'],[4,4.5,4.8,3.9,3,3],'rgba(255, 99, 71, 0.4)');

// 컨텐츠 ui 스크립트 
function uiWorks(prd){
    const opts = document.querySelectorAll('.opts');
    const optsList = document.querySelectorAll('.opts li');
    const mores =  document.querySelectorAll('.btn-more');
    const cont1Art = document.querySelectorAll('.cont01 article');
    const cont2Art = document.querySelectorAll('.cont02 article');
    const modal = document.querySelector('.detailed-pops');
    const modalClose = document.querySelector('.detailed-pops .btn-close');
    const cont01 = document.querySelector('.cont01');
    const cont02Prd = document.querySelector('.cont02');
    const cont01ttl = document.querySelector('.cont01 header h2 span');
    const cont01Prd = document.querySelector('.cont01 .projects');
    const cont01Exp = document.querySelector('.cont01 header .btn');

    opts.forEach(e=>{
        e.addEventListener('click',(er)=>{
            fn.toggleClass(er.currentTarget,'open',true);
        })
    });

    optsList.forEach((e,i)=>{
        e.addEventListener('click',(er)=>{
            let par = er.currentTarget.parentElement;
            par.getAttribute('state')!==null?(
                e.innerText==='Show all'?
                cont01ttl.innerText=`in 2021~2024`:cont01ttl.innerText=`in ${e.innerText}`

            ):par.prepend(er.currentTarget);
            i>6? cont02Prd.setAttribute('data-cat',er.currentTarget.innerText):'';
            i>=2&& i<=6? (
                fn.setMonths(er.currentTarget.innerText),
                cont01Prd.setAttribute('data-year',`${er.currentTarget.innerText}`)
            ):
            '';
            i<2?er.currentTarget.innerText=='Tools'?
            fn.setChart(['Git', 'Photoshop', 'Jira', 'Illustrator','Figma'],[4,4.5,4.8,4,4],'rgba(62, 122, 164, 0.5)'): fn.setChart(['HTML', 'CSS/SCSS', 'JavaScript', 'Node.js', 'Vue.js', 'React.js'],[4,4.5,4.8,3.9,3,3],'rgba(255, 99, 71, 0.4)'):'';
        
        })
    });
    
    mores.forEach(e=>{
        e.addEventListener('click',(ee)=>{
            let nexts =ee.currentTarget.nextElementSibling;
            fn.toggleClass(nexts,'close');
        })
    });
    
    cont2Art.forEach((e,i)=>{
        e.addEventListener('click',(ee)=>{
            cont2Art.forEach((el)=>{
                el.classList.remove('selected');
            });
            ee.currentTarget.className += ' selected';
            modal.classList.remove('close');
            fn.setModal(prd[i].name,prd[i].company,`${prd[i].year}.${prd[i].month}`,prd[i].hashes,prd[i].path,prd[i].goal);
        })
    });

    cont1Art.forEach((e,i)=>{
        e.addEventListener('click',()=>{
            modal.classList.remove('close');
            cont2Art.forEach((el)=>{
                el.classList.remove('selected');
            });
            cont2Art[i].className += ' selected';
            fn.setModal(prd[i].name,prd[i].company,`${prd[i].year}.${prd[i].month}`,prd[i].hashes,prd[i].path,prd[i].goal);
        })
    });

    modalClose.addEventListener('click',()=>{
        modal.className += ' close';
    });

    cont01Exp.addEventListener('click',()=>{
        fn.toggleClass(cont01, 'expand');
        fn.toggleClass(modal,'expand');
    })




}

// 챗봇 ui스크립트 
function chatBot(prd){
    const que = document.querySelectorAll('.robot-response .others span');
    const ans = document.querySelector('.robot-response .ans-gr');
    const robots = document.querySelector('.robot-response');
    const robotChar= document.querySelector('.robot-response .robot');
    const body = document.querySelector('body');
    const robotsClose = document.querySelector('.robot-response .btn-close');
    let cnt2 = 0;
        
    robotChar.addEventListener('click',(e)=>{
        fn.setStyle(body,{
            'height':'100vh',
            'overflow':'hidden'
        });
        !robots.classList.contains('open')?fn.addClass(robots,'open',false):'';
    })
    robotsClose.addEventListener('click',(e)=>{
        fn.setStyle(body,{
            'height':'fit-content',
            'overflow':'scroll'
        });
        robots.classList.contains('open')?robots.classList.remove('open'):'';
    })

    que.forEach((e,i)=>{
        e.addEventListener('click',()=>{
            let anstype=[...prd[i].ans];
            let cnt=0;
            let ans1=[];
            let qq = `<li class="que"><span>${prd[i].que}</span></li>`;
            let aa = `<li class="ans"></li>`;
            
            cnt2++;
            ans.innerHTML += qq+aa;
            let add = document.querySelectorAll('.ans-gr li.ans');

            const addLetter=()=>{
                ans1.push(anstype[cnt]); 
                cnt++;
                cnt > anstype.length || add[cnt2-1]===undefined ? clearInterval(st):add[cnt2-1].innerText = ans1.join('');
            };
            
            let st = setInterval(addLetter,50);
            
        })
    });
}


export{uiWorks,chatBot};