const dom={
    popHdrName : document.querySelector('.detailed-pops header h2'),
    popHdrCompany : document.querySelector('.detailed-pops header h4 span:nth-of-type(1)'),
    popHdrGoal : document.querySelector('.detailed-pops header h3 span'),
    popHdrDate : document.querySelector('.detailed-pops header h4 span:nth-of-type(2)'),
    popHdrHashes : document.querySelector('.detailed-pops header p'),
    popDetail : document.querySelector('.detailed-pops section .image'),
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
                    borderWidth: 0,
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
                        }
                    },
                    plugins:{
                        legend:{
                            display:false
                        }
                    }
                }
            });
    },
    setModal:(name,company,date,hashes,details,goal)=>{
        dom.popHdrName.innerText =name;
        dom.popHdrCompany.innerText =company;
        dom.popHdrDate.innerText = date;
        dom.popHdrGoal.innerText=goal;
        dom.popHdrHashes.innerHTML = hashes.join('');
        let type = details.split('.');
        type[type.length-1]==='pdf'?
        dom.popDetail.innerHTML = `<embed type="application/pdf" src="${details}" width="100%" height="800" />`
        :
        dom.popDetail.innerHTML = `<img src="${details}">`;
    },
    addClass:(node,classname)=>{
        node.classList[1]==classname?'':node.className +=` ${classname}`;
    },
    removeClass:(node,classname)=>{
        console.log(node.classList[1]);
        console.log(classname);
        node.classList.remove(classname);
    },
    toggleClass:(node,className)=>{
        node.classList[1]==className?
        node.classList.remove(className):node.className +=` ${className}`;
    }
}