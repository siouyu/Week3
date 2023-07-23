url = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"

let promotion = document.querySelectorAll(".newPromotion") 
let title = document.querySelectorAll(".newTitle") 

// fetch 是非同步函式，因為不確定資料量多寡需要抓多久時間、避免網頁空白，所以 fetch 會去其他地方抓資料
fetch(url).then(function(response){
    return response.json();
}).then(function(list){
    let data = list["result"]["results"];

    // 先處理 promotion 圖片
    for(let i=0; i<promotion.length; i++){
        const proPic = document.createElement("img");
        proPic.className= "picPromotion";
        let file=data[i]["file"].split("https");
        // console.log(file)
        proPic.src = "https"+file[1];
        // console.log("https"+file[1])
        promotion[i].appendChild(proPic);
    }
    // 處理 promotion 文字
    for (let i=0; i<promotion.length; i++){
        const proText = document.createElement("div");
        proText.className = "wordPromotion";
        const textnode = document.createTextNode(data[i]["stitle"]);
        proText.appendChild(textnode); 
        // 把文字塞進變數裡
        promotion[i].appendChild(proText); 
        // 把變數塞進 div 裡
    }
    // 處理 title 圖片
    for(let i =0; i<title.length; i++){
        const tiPic= document.createElement("img");
        tiPic.className = "picTitle";
        let file=data[i+3]["file"].split("https");
        tiPic.src = "https"+file[1];
        title[i].appendChild(tiPic);
        //  處理 title 文字
        const tiText = document.createElement("div");
        tiText.className = "wordTitle";
        const textnode = document.createTextNode(data[i+3]["stitle"]);
        tiText.appendChild(textnode);
        title[i].appendChild(tiText);
    }

    // Load More button
    let morebtn = document.querySelector(".morebtn")
    let title_frame = document.querySelector(".title_frame")

    let titleCount=12;
    morebtn.onclick = function(){
        // console.log("hey")
        for(let i=0; i<12; i++){
            // console.log(i)
            const moreTitle = document.createElement("div");
            moreTitle.className = "newTitle";
            title_frame.appendChild(moreTitle)
        }
        let title = document.querySelectorAll(".newTitle") 

        console.log(titleCount)
        if(titleCount > data.length-12){
            // console.log("hello")
            morebtn.style.visibility="hidden";
        }

        for (let i=0; i<12; i++){
            // console.log(i)
            const tiPic= document.createElement("img");
            tiPic.className = "picTitle";
            let file=data[titleCount+3]["file"].split("https");
            tiPic.src = "https"+file[1];
            title[titleCount].appendChild(tiPic);
            // 按下去會生成的 title 文字
            const tiText = document.createElement("div");
            tiText.className = "wordTitle";
            const textnode = document.createTextNode(data[titleCount+3]["stitle"]);
            tiText.appendChild(textnode);
            title[titleCount].appendChild(tiText);
            titleCount++
            // console.log(titleCount)
        }
    }
})

function over(btn_elem){
    btn_elem.style.backgroundColor="#ADADAD";
}
function out(btn_elem){
    btn_elem.style.backgroundColor="#E0E0E0";
}
function down(btn_elem){
    btn_elem.style.fontWeight="bold";
}
function up(btn_elem){
    btn_elem.style.fontWeight="normal";
}

