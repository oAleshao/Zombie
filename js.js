"use strict"

// let startPosition = 95;
// let width = 80;


let Round = 1;
let countZombies = 3;
let curZombies = countZombies;
let Score = 0;
let MaxScore = localStorage.getItem("MaxScore");
scoreMax.textContent = MaxScore;
let ChoseGun = 'faceSlap';
let audioTrue = true;
let ChosenGunDamage = 5;


document.addEventListener("contextmenu", (event)=>
{
    event.preventDefault();
}
);



//////////////////////////////////////////////////

let arrSkin = ['./img/0.png','./img/1.png' ,'./img/2.png' , './img/3.png' , './img/4.png' , './img/5.png'];
let arrSkinBoss = ['./img/boss0.png','./img/boss1.png' ,'./img/boss2.png' , './img/boss3.png'];
let positionTop = [10, 30, 50, 60,];
let arrHp = [100,150, 200,250,300];


//с каждым раундом увеличиваем хп зомби на 1.2. Каждый 5 раунд выходит босс. Менять Score. Добавляем каждый раун по одному зомби.
//



class stone
{
    constructor() {
        this.damage = 10,
        this.price = 100,
        this.upDamage = 10;
    }

    upgradeGun() {
        this.upDamage +=this.damage;
        this.price = Math.round(this.price *= 1.25);
    }
}

class bat
{
    constructor() {
        this.damage = 20, //дефолтный
        this.price = 150,
        this.upDamage = 20
    }

    upgradeGun() {
        this.upDamage +=this.damage;
        this.price = Math.round(this.price *= 1.25);
    }
}

class axe
{ 
    constructor() {
        this.damage = 50 * this.amount,
        this.price = 300,
        this.upDamage = 50;
    }

    upgradeGun() {
        this.upDamage +=this.damage;
        this.price = Math.round(this.price *= 1.25);
    }
}

class mace {
    constructor() { 
        this.damage = 80,
        this.price = 500,
        this.upDamage = 80;
    }

    upgradeGun() {
        this.upDamage +=this.damage;
        this.price = Math.round(this.price *= 1.25);
    }
}

class chain
{ 
    constructor() {
        this.damage = 100,
        this.price = 700
        this.upDamage = 100;
    }
    
    upgradeGun() {
        this.upDamage +=this.damage;
        this.price = Math.round(this.price *= 1.25);
    }
}



let Stone = new stone();
let Axe = new axe();
let Bat = new bat();
let Mace = new mace();
let Chain = new chain();


start.onclick = () =>{
    IniGun();
    startGame();
};

function startGame() {
    let time = 100;
    for(let i = 0; i < countZombies; i++ ){
        setTimeout(CreateZombie,time);
        time += 300;
    }
}

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


//#region  Gun

function IniGun(){

    StoneUpgrade.addEventListener('click' , (event)=> {
        event.stopPropagation();
         upgradeGun(Stone); 
         event.target.textContent = Stone.price;
         localStorage.setItem("StoneUpgrade", Stone.price);
        });
    StoneLi.addEventListener('click' , ()=>{ChosenGunDamage = Stone.upDamage; setGunDamage("StoneLi");});

   
    MaceUpgrade.addEventListener('click' , (event)=> {
        event.stopPropagation();
         upgradeGun(Mace);
         event.target.textContent = Mace.price;
         localStorage.setItem("MaceUpgrade", Mace.price);
        });
    MaceLi.addEventListener('click' , ()=>{ChosenGunDamage = Mace.upDamage; setGunDamage("MaceLi");});

    AxeUpgrade.addEventListener(('click') , (event)=> { 
        event.stopPropagation(); 
        upgradeGun(Axe);
        event.target.textContent = Axe.price
        localStorage.setItem("AxeUpgrade", Axe.price);
    });
    AxeLi.addEventListener('click' , ()=>{ChosenGunDamage = Axe.upDamage; setGunDamage("AxeLi");});


    BatUpgrade.addEventListener(('click') , (event)=> {
        event.stopPropagation(); 
        upgradeGun(Bat);
        event.target.textContent = Bat.price;
        localStorage.setItem("BatUpgrade", Bat.price);
    });
    BatLi.addEventListener('click' , ()=>{ChosenGunDamage = Bat.upDamage; setGunDamage("BatLi");});


    ChainsawUpgrade.addEventListener(('click') , (event)=> {
        event.stopPropagation();
        upgradeGun(Chain);
        event.target.textContent = Chain.price;
        localStorage.setItem("ChainsawUpgrade", Chain.price);
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
    if(Score>=gun.price)
    {
        gun.upgradeGun();
    }
}

//#endregion



function CreateZombie(skin, hp, randomMax)
{ 
    let RundNum = Math.floor(Math.random()*6);
    let zomb = new zombiePrototype(arrSkin[RundNum],arrHp[RundNum]);


    let startPosition = 35;
    let blockZ = document.createElement("div");
    blockZ.className = "zombies";
    blockZ.style.position = "absolute";

    blockZ.style.top =  (Math.floor(Math.random()*60)+13)+ "%";
    blockZ.style.left =  startPosition + "%";


    let number = Math.floor(Math.random() * 3);
    let z = document.createElement("img");
    z.src = zomb.image;
    z.style.fill = "fill";
    z.style.height = "130px";
    z.style.width = "80px";
   
    let health = document.createElement("div");
    health.classList.add("healthLine");
    health.textContent = zomb.health;
    blockZ.append(health);
    blockZ.append(z);

    let idInterval = setInterval(() => {
        if(startPosition === 30)
        {
            gameOver();
        }
        blockZ.style.left = --startPosition + "%"
    }, 1000);

    blockZ.onclick = (event) => {

        zomb.health -= ChosenGunDamage;
       
        if(zomb.health <=0)
        {
            Score += Math.floor(50*1.13);
            scoreCur.textContent = Score;
            if(Score > MaxScore) {
                scoreMax.textContent = Score;
                MaxScore = Score;
                localStorage.setItem("MaxScore", Score);

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

function createNewRound(){
    ++countZombies;
    localStorage.setItem("Round", ++Round);
    for(let i = 0; i< arrHp.length; i++){
        arrHp[i] = Math.floor(arrHp[i] *= 1.2);
    }
    curZombies = countZombies;
    startGame();
}

function gameOver(){

    let lose = document.createElement("audio");
    lose.src = "./sounds/lose.mp3";
    lose.volume = 0.6;
    lose.play();

    let end = document.createElement("div");
    end.classList.add("gameOverDivStyle");
    
    let imgGameOver = document.createElement("img");
    imgGameOver.src = "./img/gameOver.png";
    imgGameOver.style.width = "50%";
    imgGameOver.style.height = "40%";
    imgGameOver.style.margin = "15% auto"
    
 
    
    end.append(imgGameOver);

    document.querySelectorAll('.zombies').forEach(function(elem){
        elem.parentNode.removeChild(elem);
    });


    
    fealdGame.append(end);
}


class zombiePrototype
{
    constructor(image , health)
    {
        this.image = image,
        this.health = health

    }
}