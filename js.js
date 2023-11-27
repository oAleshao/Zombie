"use strict"

let startPosition = 95;

start.onclick = () =>{
    let z = document.createElement("img");
    z.id = "zombi";
    z.src = "img/3.png";
    z.style.height = "130px";
    z.style.width = "80px";
    z.style.position = "absolute";
    z.style.top = "25%";
    z.style.left =  startPosition + "%";
    fealdGame.append(z);
    setInterval(() => {
        z.style.left = --startPosition + "%"
    }, 800);
};



//fealdGame.