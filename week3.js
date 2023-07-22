url = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"

let promotion = document.querySelectorAll(".newPromotion") 
let title = document.querySelectorAll(".newTitle") 

fetch(url).then(function(response){
    return response.json();
}).then(function(list){
    let data = list["result"]["results"];

    // 先處理 promotion 圖片
    for(let i=0; i<promotion.length; i++){
        const proPic = document.createElement("img");
        proPic.className= "picPromotion";
        let file=data[i]["file"].split("https");
        proPic.src = "https"+file[1];
        promotion[i].appendChild(proPic);
    }
    // 處理 promotion 文字
    for (let i=0; i<promotion.length; i++){
        const proText = document.createElement("div");
        proText.className = "wordPromotion";
        const textnode = document.createTextNode(data[i]["stitle"]);
        proText.appendChild(textnode);
        promotion[i].appendChild(proText);
    }
    // 處理 title 圖片
    for(let i =0; i<title.length; i++){
        const tiPic= document.createElement("img");
        tiPic.className = "picTitle";
        let file=data[i+3]["file"].split("https");
        tiPic.src = "https"+file[1];
        title[i].appendChild(tiPic);
    //  處理 title 文字
    }
    for(let i =0; i<title.length; i++){
        const tiText = document.createElement("div");
        tiText.className = "wordTitle";
        const textnode = document.createTextNode(data[i+3]["stitle"]);
        tiText.appendChild(textnode);
        title[i].appendChild(tiText);
    }
})