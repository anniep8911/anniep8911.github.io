import fn from './funcs.js';
let skillCol = 'rgba(255,206,40,0.9)';
let toolCol = 'rgba(42, 157, 143,0.9)';

fn.setChart(['HTML', 'CSS/SCSS', 'JavaScript', 'Node.js', 'Vue.js', 'React.js'],[4,4.5,4.8,3.9,3,3],skillCol);


// 컨텐츠 ui 스크립트 
function uiWorks(prd){
    const opt= document.querySelector('.opt');
    const mores =  document.querySelectorAll('.btn-more');
    const cont1Art = document.querySelectorAll('.cont01 article');
    const modal = document.querySelector('.detailed-pops');
    const modalClose = document.querySelector('.detailed-pops .btn-close');
    const cont01List = document.querySelectorAll('.cont01 li');
    const cont01 = document.querySelector('.cont01 .chart-prog');
    const prj = document.querySelector('.cont01 .projects');
    const dev = fn.checkWin();
    const dtTab = document.querySelectorAll('.hdr-exp li');
    const dtDetails = document.querySelectorAll('.hdr-exp .texts>div');


    opt.addEventListener('click',(e)=>{
        fn.toggleClass(e.currentTarget,'tool');
        let sp = e.currentTarget.querySelector('span');
        e.currentTarget.classList.length>1?
        (
            fn.setChart(['Git', 'Photoshop', 'Jira', 'Illustrator','Figma', 'Zeplin'],[5,4,5,4,4,4],toolCol),
            sp.innerText = 'click here to see skill'
            
        )
        : 
        (
            fn.setChart(['HTML', 'CSS/SCSS', 'JavaScript', 'Node.js', 'Vue.js', 'React.js'],[4,4.5,4.8,3.9,3,3],skillCol),
            sp.innerText = 'click here to see tool'
        )
    })
    
    mores.forEach(e=>{
        e.addEventListener('click',(ee)=>{
            let nexts =ee.currentTarget.nextElementSibling;
            fn.toggleClass(nexts,'close');
        })
    });
    
  

    cont1Art.forEach((e,i)=>{
        e.addEventListener('click',()=>{
            modal.classList.remove('close');
            fn.setModal(prd[i].name,prd[i].company,`${prd[i].year}.${prd[i].month}`,prd[i].hashes,`${prd[i].path}.md`,prd[i].goal);
        })
    });

    // 동적 데이터용 이벤트 
    document.querySelector('.ranks').addEventListener('click', (e) => {
        let el = e.target.closest('p');
        if (!el) return;
        console.log(el);
        modal.classList.remove('close');
        fn.setModal(
            el.dataset.name,
            el.dataset.company,
            `${el.dataset.year}.${el.dataset.month}`,
            [el.dataset.hashes],
            `${el.dataset.path}.md`,
            el.dataset.goal
          );
    });
  

    modalClose.addEventListener('click',()=>{
        modal.className += ' close';
        modal.querySelector('section').innerHTML ='';
    });

    let anc =0;
    let prev= 0;
    cont01List.forEach((e,i)=>{
        e.addEventListener('click',()=>{
            let now = i+0.5;
            anc = prev;
            prev=i;
            
            dev!=='mob'?
            anc>prev?
            fn.addClass(cont01,'prev'):fn.removeClass(cont01,'prev'):'';
            
            document.querySelector('.cont01').style.setProperty('--packman', now);
            prj.setAttribute('data-year',e.innerText);
            e.innerText!=='ALL'?
            fn.addClass(prj,'single')
            :
            fn.removeClass(prj,'single');
        })
    })


    // 실시간 데이터 탭 인터렉션
    dtTab.forEach((e,i,a)=>{
        e.addEventListener('click',()=>{
            a.forEach((f,id)=>{
                fn.removeClass(dtDetails[id],'selected');
                fn.removeClass(f,'sel');
            })
            fn.addClass(e,'sel');
            fn.addClass(dtDetails[i],'selected');
        })
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
        window.innerWidth <=  700?
        fn.setStyle(body,{
            'touch-action': 'none',
            'position':'fixed'
        }):'';
        !robots.classList.contains('open')?fn.addClass(robots,'open',false):'';
    })
    robotsClose.addEventListener('click',(e)=>{
        fn.setStyle(body,{
            'touch-action': 'inherit',
            'position':'relative'
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