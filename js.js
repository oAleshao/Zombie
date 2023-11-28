"use strict"

// let startPosition = 95;
// let width = 80;



start.onclick = () =>{

    let startPosition = 95;
    let blockZ = document.createElement("div");

    blockZ.style.position = "absolute";
    blockZ.style.top = "25%";
    blockZ.style.left =  startPosition + "%";


    let number = Math.floor(Math.random() * 7);
    let z = document.createElement("img");
    z.id = "zombi";
    z.src = `img/${number}.png`;
    z.style.fill = "fill";
    z.style.height = "130px";
    z.style.width = "80px";
   
    let health = document.createElement("div");
    health.id = "zomblie"
    health.style.border = "1px solid green";
    health.style.borderRadius = "10px"
    health.style.width = "80px";
    health.style.height = "10px";
    health.style.background = "lime";
    blockZ.append(health);
    blockZ.append(z);

    
  
    fealdGame.append(blockZ);
    let idInterval = setInterval(() => {
        blockZ.style.left = --startPosition + "%"
        console.log("WORK");
    }, 800);

    let width = 80;
    blockZ.onclick = (event) => {
       if(width === 0){
            clearInterval(idInterval);
            fealdGame.removeChild(blockZ);
            return;
        }
        width -= 2;
        health.style.width = (width) + "px";
        
    }

    
};

document.addEventListener("contextmenu", (event)=>
{
    event.preventDefault();

}
);


//fealdGame.