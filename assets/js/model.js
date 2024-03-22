async function getData(url){
    try{
        const response = await fetch(url,{
            method: "GET",
            headers:{
                "Content-type":"application/json",
            }
        });
        return await response.json();
    }catch(e){
        throw e;
}};

async function dataLoading(url){
    let prd =[];
    url.forEach(e=>{
        prd.push(e);
    });

    return prd;
}

export {getData,dataLoading};