const dom={
    popHdrName : document.querySelector('.detailed-pops header h2'),
    popHdrCompany : document.querySelector('.detailed-pops header h4 span:nth-of-type(1)'),
    popHdrGoal : document.querySelector('.detailed-pops header h3 span'),
    popHdrDate : document.querySelector('.detailed-pops header h4 span:nth-of-type(2)'),
    popHdrHashes : document.querySelector('.detailed-pops header p'),
    popDetail : document.querySelector('.detailed-pops section'),
    cont1month : document.querySelector('.cont01 .chart-prog'),
    windowWidth : window.innerWidth
}
export default{
    setChart:(label,datas,bgc)=>{
        const ctxWrap = document.querySelector('.charts');
            ctxWrap.innerHTML='<canvas id="charts"></canvas>';
            const ctx = document.querySelector('#charts'); 
            new Chart(ctx, {
                type: 'radar',
                data: {
                labels: label,
                datasets: [{
                    label: 'Level',
                    data: datas,
                    borderWidth: 2,
                    borderColor: '#000',
                    pointRadius: 0, 
                    backgroundColor:bgc,
                    hoverBackgroundColor:'blue',
                    pointRotation:5,
                }]
                },
                options: {
                    scales: {
                        r: {
                        beginAtZero: true,
                        min:0,
                        max:5,
                        stepSize:1,
                        angleLines: {
                            color: '#000',      // 축 선 색
                            lineWidth: 2
                          },
                          grid: {
                            color: '#000',      // 동심원 색
                            lineWidth: 1.5
                            
                          },
                          ticks: {
                            stepSize: 1,  
                            display: false    // ✅ 숫자 숨김
                          },
                          pointLabels: {
                            color: '#000', // ← 여기!
                            font: {
                              size: 11,
                              weight: 'bold'
                            }
                          },
                        }
                    },
                    plugins:{
                        legend:{
                            display:false
                        },
                        tooltip:{
                            enabled:true,
                        }
                    },
                }
            });
    },
    setLineChart:()=>{
        
    }
    ,
    setModal:(name,company,date,hashes,details,goal)=>{
        dom.popHdrName.innerText =name;
        dom.popHdrCompany.innerText =company;
        dom.popHdrDate.innerText = date;
        dom.popHdrGoal.innerText=goal;
        dom.popHdrHashes.innerHTML = hashes.map(m=>`<span>#${m}</span>`).join('');
        !details.includes('pdf')?
        dom.popDetail.innerHTML =`<md-block src="./assets/posts/${details}">
        <!-- README.md 로드 실패시 보이는 문구 -->
        ${details} was *not* found </md-block>`:
        dom.popDetail.innerHTML =`<iframe width="100%" height="100%" src="./assets/posts/${details}"></iframe>`;

    },
    setMonths:(y)=>{
        let mtn=0;
        let months = '';
        let mon =  ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
        let years = [2024,2023,2022,2021];
        y<2024 && y!=='Show all'? mtn=12: y=='Show all'?mtn=4:mtn=12;
        for(let i =0; i<mtn; i++){
            if(y !=='Show all'){
                months += `<li>${mon[i]}</li>`;
            } else{
                months += `<li>${years[i]}</li>`
            }
            
        }
        dom.cont1month.innerHTML = months;
        document.documentElement.style.setProperty(`--cnt-art`,`${mtn}`);
    }
    ,
    addClass:(node,classname)=>{
        node.classList[1]==classname?'':node.className +=` ${classname}`;
    },
    removeClass:(node,classname)=>{
        node.classList.remove(classname);
    },
    toggleClass:(node,className)=>{
        node.classList.toString().indexOf(className)>0?
        node.classList.remove(className):node.className +=` ${className}`;
    },
    setStyle:(dom,st)=>{
        for(let i in st){
            dom.style[i]=st[i];
        }
    },
    checkWin(){
        let st = '';
        dom.windowWidth>700 ? st='pc':st='mob';
        return st;
    }
}