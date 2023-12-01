"use strict"

document.addEventListener("contextmenu", (event)=> { event.preventDefault(); });


//#region Окно загрузки

loader.onclick = ()=>{
    backSound.volume = 0.1;
    backSound.loop = true;
    backSound.play();
    audioTrue = true;
    TurnOffBackSound.classList.remove("activeBtn");
    TurnOnBackSound.classList.add("activeBtn");
    loader.style.display = "none";
}

//#endregion


//#region Объекты

class stone
{
    constructor() {
        this.damage = 10,
        this.price = 100,
        this.upDamage = 10;
    }

}

class bat
{
    constructor() {
        this.damage = 20, //дефолтный
        this.price = 150,
        this.upDamage = 20
    }
}

class axe
{ 
    constructor() {
        this.damage = 50 * this.amount,
        this.price = 300,
        this.upDamage = 50;
    }
}

class mace {
    constructor() { 
        this.damage = 80,
        this.price = 500,
        this.upDamage = 80;
    }

}

class chain
{ 
    constructor() {
        this.damage = 100,
        this.price = 700
        this.upDamage = 100;
    }
}


class zombiePrototype
{
    constructor(image , health, position, height, width, speed = 1200)
    {
        this.image = image;
        this.health = health;
        this.topPosition = position;
        this.height = height;
        this.width = width;
        this.speed = speed;
    }
}

//#endregion


//#region  Свойства

let Round = 1;
let countZombies = 3;
let curZombies = countZombies;
let coins = localStorage.getItem("Coins");
let Score = 0;
let MaxScore = 0;
let ChoseGun = 'faceSlap';
let audioTrue = true;
let ChosenGunDamage = 5;
let youLose = false;
let arrSkin = ['./img/0.png','./img/1.png' ,'./img/2.png' , './img/3.png' , './img/4.png' , './img/5.png'];
let arrSkinBoss = ['./img/boss0.png','./img/boss1.png' ,'./img/boss2.png' , './img/boss3.png'];
let positionTop = [5, 20, 35, 50, 65];
//let arrHp = [100,150, 200,250,300];
let arrHp = [30,50, 70,100,150];



let Stone, Axe, Bat, Mace, Chain = null;


let end = document.createElement("div");
end.classList.add("gameOverDivStyle");

let imgGameOver = document.createElement("img");
imgGameOver.src = "./img/gameOver.png";
imgGameOver.classList.add("imgGameOver");
end.append(imgGameOver);

function init(){
    coins = localStorage.getItem("Coins");
    if(coins === null || coins === undefined)
        coins = 0;

    MaxScore = localStorage.getItem("MaxScore");
    if(MaxScore === null || MaxScore === undefined)
        MaxScore = 0;

    scoreMax.textContent = MaxScore;
    balance.textContent = coins;
    Stone = JSON.parse(localStorage.getItem("Stone"));
    if(Stone === null)
        Stone = new stone();
    Axe = JSON.parse(localStorage.getItem("Mace"));
    if(Axe === null)
        Axe = new axe();
    Bat = JSON.parse(localStorage.getItem("Axe"));
    if(Bat === null)
        Bat = new bat();
    Mace = JSON.parse(localStorage.getItem("Bat"));    
    if(Mace === null)
        Mace = new mace();    
    Chain = JSON.parse(localStorage.getItem("Chainsaw"));
    if(Chain === null)
        Chain = new chain();
    
    StoneUpgrade.textContent = Stone.price; 
    MaceUpgrade.textContent = Mace.price;
    AxeUpgrade.textContent = Axe.price;
    BatUpgrade.textContent = Bat.price;  
    ChainsawUpgrade.textContent = Chain.price;
    
}

init();


IniGun();

//#endregion


//#region Игра

start.onclick = () =>{
    if(youLose)
        fealdGame.removeChild(end);
    youLose = false;
    startGame();
    start.setAttribute('disabled', '');
};

function startGame() {
    let time = 1000;
    let zombiesSkin = getArrZombies();
    let i = 0;
    let idI = setInterval(()=>{
        // console.log("work");
        CreateZombie(zombiesSkin[i]);
        i++;
        if(i === countZombies)
            clearInterval(idI);
    }, time);
}


function createNewRound(){
    // console.log("work Create new Round");
    ++countZombies;
    localStorage.setItem("Round", ++Round);
    for(let i = 0; i< arrHp.length; i++){
        arrHp[i] = Math.floor(arrHp[i] *= 1.15);
    }
    curZombies = countZombies;
    startGame();
}


function gameOver(){
    // console.log("work game Over");
    if(!youLose){
        let lose = document.createElement("audio");
        lose.src = "./sounds/lose.mp3";
        lose.volume = 0.6;
        lose.play();
        youLose = true;
    }

    document.querySelectorAll('.zombies').forEach(function(elem){
        elem.parentNode.removeChild(elem);
    });


    start.removeAttribute('disabled', '');
    countZombies = 3;
    Round = 1;
    arrHp = [100,150, 200,250,300];
    fealdGame.append(end);

}

function getArrZombies(){
    let zombiesSkin = [];
    let RundNum = 0;

    if(Round % 5 === 0){
        zombiesSkin.push(new zombiePrototype(arrSkinBoss[Math.floor(Math.random()*3)], (arrHp[4]+500), positionTop[Math.floor(Math.random()*6)], 150, 150));
        for(let i = 1; i < countZombies; i++){
            RundNum = Math.floor(Math.random()*5);
            zombiesSkin.push(new zombiePrototype(arrSkin[RundNum], arrHp[RundNum], positionTop[Math.floor(Math.random()*5)], 130, 80, RundNum*100+400));
        }
    }
    else{
        for(let i = 0; i < countZombies; i++){
            RundNum = Math.floor(Math.random()*5);
            zombiesSkin.push(new zombiePrototype(arrSkin[RundNum], arrHp[RundNum], positionTop[Math.floor(Math.random()*5)],130, 80,  RundNum*100+400));
        }
    }
    return zombiesSkin;
}


setInterval(()=>{
    localStorage.setItem("Coins", coins);    
    localStorage.setItem("MaxScore", MaxScore);   
    localStorage.setItem("Stone", JSON.stringify(Stone)); 
    localStorage.setItem("Mace", JSON.stringify(Mace));
    localStorage.setItem("Axe", JSON.stringify(Axe));
    localStorage.setItem("Bat", JSON.stringify(Bat));    
    localStorage.setItem("Chainsaw", JSON.stringify(Chain));
}, 5000);


function CreateZombie(zomb)
{ 
    let startPosition = 93;
    let amoutCoin = Math.round(zomb.health/100*5);
    let blockZ = document.createElement("div");
    blockZ.className = "zombies";
    blockZ.style.position = "absolute";
    blockZ.style.zIndex = zomb.topPosition;

    blockZ.style.top =  zomb.topPosition + "%";
    blockZ.style.left =  startPosition + "%";

    let z = document.createElement("img");
    z.src = zomb.image;
    z.style.fill = "fill";
    z.style.height = zomb.height + "px";
    z.style.width = zomb.width + "px";
   
    let health = document.createElement("div");
    health.classList.add("healthLine");
    health.textContent = zomb.health;
    blockZ.append(health);
    blockZ.append(z);

    let idInterval = setInterval(() => {
        if(startPosition < 30 || youLose)
        {
            clearInterval(idInterval);
            gameOver();
        }
        startPosition -= 0.5;
        blockZ.style.left = startPosition + "%"
    }, zomb.speed);

    blockZ.onclick = (event) => {

        zomb.health -= ChosenGunDamage;
       
        if(zomb.health <=0)
        {
            Score += Math.floor(50*1.13);
            scoreCur.textContent = Score;

            coins = amoutCoin + parseInt(coins);
            balance.textContent = coins;

            if(Score > MaxScore) {
                scoreMax.textContent = Score;
                MaxScore = Score;
            }

            clearInterval(idInterval);
            fealdGame.removeChild(blockZ);

            curZombies--;
            if(curZombies === 0)
            {
                if(Score > MaxScore)
                    localStorage.setItem("MaxScore", Score);
                createNewRound();
    
            }
            return;
        }
       

        if(audioTrue){
            let slap = document.createElement("audio");
            slap.src = `./sounds/${ChoseGun}.mp3`;
            slap.volume = 0.1;
            slap.play();
        }



        health.textContent = zomb.health;

        
    }

    fealdGame.append(blockZ);
}




//#endregion


//#region Музыка и звуки

TurnOnBackSound.onclick = ()=>{
    backSound.volume = 0.1;
    backSound.loop = true;
    backSound.play();
    audioTrue = true;
    TurnOffBackSound.classList.remove("activeBtn");
    TurnOnBackSound.classList.add("activeBtn");
}

TurnOffBackSound.onclick = ()=>{
    backSound.pause();
    TurnOnBackSound.classList.remove("activeBtn");
    TurnOffBackSound.classList.add("activeBtn");
    audioTrue = false;
}

//#endregion


//#region  Gun

function IniGun(){

    StoneUpgrade.addEventListener('click' , (event)=> {
        event.stopPropagation();
         upgradeGun(Stone); 
         event.target.textContent = Stone.price;
        });
    StoneLi.addEventListener('click' , ()=>{ChosenGunDamage = Stone.upDamage; setGunDamage("StoneLi");});

   
    MaceUpgrade.addEventListener('click' , (event)=> {
        event.stopPropagation();
         upgradeGun(Mace);
         event.target.textContent = Mace.price;
        
        });
    MaceLi.addEventListener('click' , ()=>{ChosenGunDamage = Mace.upDamage; setGunDamage("MaceLi");});

    AxeUpgrade.addEventListener(('click') , (event)=> { 
        event.stopPropagation(); 
        upgradeGun(Axe);
        event.target.textContent = Axe.price;
    });
    AxeLi.addEventListener('click' , ()=>{ChosenGunDamage = Axe.upDamage; setGunDamage("AxeLi");});


    BatUpgrade.addEventListener(('click') , (event)=> {
        event.stopPropagation(); 
        upgradeGun(Bat);
        event.target.textContent = Bat.price;
    });
    BatLi.addEventListener('click' , ()=>{ChosenGunDamage = Bat.upDamage; setGunDamage("BatLi");});


    ChainsawUpgrade.addEventListener(('click') , (event)=> {
        event.stopPropagation();
        upgradeGun(Chain);
        event.target.textContent = Chain.price;
    })
    ChainsawLi.addEventListener('click' , ()=>{ChosenGunDamage = Chain.upDamage; setGunDamage("ChainsawLi");});

}

function setGunDamage(gun) {

    if(gun === 'faceSlap'){
        return;   
    }
    if(ChoseGun === gun){
        document.getElementById(ChoseGun).classList.remove("activeGun");
        ChoseGun = 'faceSlap';
        ChosenGunDamage = 5;
        return;
    }
    if(ChoseGun !== 'faceSlap') {
        document.getElementById(ChoseGun).classList.remove("activeGun");
    }
    ChoseGun = gun;    
    document.getElementById(gun).classList.add("activeGun");  
    
}

function upgradeGun(gun)
{
    if(parseInt(coins)>=gun.price)
    {
        coins = parseInt(coins) - gun.price;
        balance.textContent = coins;
        gun.upDamage += gun.damage;
        gun.price = Math.round(gun.price *= 1.25);
    }
}
//#endregion









