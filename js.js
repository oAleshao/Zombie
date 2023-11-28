"use strict"
let arrSkin = ['url(./img/1.png)','url(./img/2.png)' ,'url(./img/3.png)' , 'url(./img/4.png)' , 'url(./img/5.png)' , 'url(./img/6.png)'];
let arrHp = [100,150, 200,250,300];


//с каждым раундом увеличиваем хп зомби на 1.2. Каждый 5 раунд выходит босс. Менять Score. Добавляем каждый раун по одному зомби.
//


class hands
{
    constructor(){
    this.amount = 1,
    this.stone = 5,
    this.price = 0
    }

    
}

class stone
{
    constructor(){
        
    this.amount = 1,
    this.damage = 10,
    this.price = 100,
    this.upDamage = 10;
    }

    upgradeGun()
    {
    this.upDamage +=this.damage;
    this.amount+=1;
    this.price*=1.25;
    alert("dmg = " + this.upDamage  + " amount = " + this.amount + "  price = " + this.price)
    }
}
class bat
{
    constructor(){

    
    this.damage = 20, //дефолтный
    this.price = 150,
    this.upDamage = 20
    }

    upgradeGun()
    {
    this.upDamage +=this.damage;
    this.amount+=1;
    this.price*=1.25;
    alert("dmg = " + this.upDamage  + " amount = " + this.amount + "  price = " + this.price)
    }
}
class axe
{ constructor()
    {
        
   
    this.damage = 50 * this.amount,
    this.price = 300,
    this.upDamage = 50;
    }

    upgradeGun()
    {
    this.upDamage +=this.damage;
    this.amount+=1;
    this.price*=1.25;
    alert("dmg = " + this.upDamage  + " amount = " + this.amount + "  price = " + this.price)
    }
}
class mace
{
    constructor()
    {
   
    this.damage = 80,
    this.price = 500,
    this.upDamage = 80;
}

    upgradeGun()
{
    this.upDamage +=this.damage;
    this.amount+=1;
    this.price*=1.25;
    alert("dmg = " + this.upDamage  + " amount = " + this.amount + "  price = " + this.price)
}
}
class chain
{ constructor(){
        
    
    this.damage = 100,
    this.price = 700
    this.upDamage = 100;
}
     upgradeGun()
    {
    this.upDamage +=this.damage;
    this.amount+=1;
    this.price*=1.25;
    alert("dmg = " + this.upDamage  + " amount = " + this.amount + "  price = " + this.price)
    }
}



let Stone = new stone();



let Axe = new axe();
let Bat = new bat();
let Mace = new mace();
let Chain = new chain();
let Hands = new hands();

let ChosenGunDamage = Hands.stone;
let round = 1;
let Score = 300;

let startPosition = 95;

start.onclick = () =>{
    IniGun();
    for(let i = 0; i <round*3;i++ )
         CreateZombie();
};







function IniGun(){
document.getElementById('stone').getElementsByTagName('button').item(0).addEventListener('click' , (event)=>{upgradeGun(Stone); event.target.textContent = Stone.textContent})
document.getElementById('stone').addEventListener('click' , ()=>{ChosenGunDamage = Stone.upDamage })


document.getElementById('mace').getElementsByTagName('button').item(0).addEventListener('click' , (event)=>{upgradeGun(Mace);event.target.textContent = Mace.textContent})
document.getElementById('mace').addEventListener('click' , ()=>{ChosenGunDamage = Mace.upDamage })

document.getElementById('axe').getElementsByTagName('button').item(0).addEventListener(('click') , (event)=>{upgradeGun(Axe);event.target.textContent = Axe.textContent})
document.getElementById('axe').addEventListener('click' , ()=>{ChosenGunDamage = Axe.upDamage})


document.getElementById('bat').getElementsByTagName('button').item(0).addEventListener(('click') , (event)=>{upgradeGun(Bat) , event.target.textContent = Bat.textContent;})
document.getElementById('bat').addEventListener('click' , ()=>{ChosenGunDamage = Bat.upDamage})


document.getElementById('chain').getElementsByTagName('button').item(0).addEventListener(('click') , (event)=>{upgradeGun(Chain);event.target.textContent = Chain.textContent})
document.getElementById('chain').addEventListener('click' , ()=>{ChosenGunDamage = Chain.upDamage})
}


function upgradeGun(gun)
{
    if(Score>=gun.price)
    {
        gun.upgradeGun();
        
    }
}







function CreateZombie(flagBoss)
{

    let RundNum = Math.floor(Math.random(0,5)*5);
    let zomb = new zombiePrototype(arrSkin[RundNum],arrHp[RundNum]);

    let zombak = document.createElement("button");
    zombak.class = "zombi";
    
    zombak.style.height = "130px";
    zombak.style.width = "80px";
    zombak.style.position = "absolute";
    zombak.style.top = "25%";
    zombak.style.left =  startPosition + "%";
    zombak.style.background = zomb.image;
    zombak.style.border = 'none';
    zombak.style.backgroundSize = '80px';


    zombak.addEventListener(('click') , ()=>{
        zomb.health -= ChosenGunDamage;
       
        if(zomb.health <=0)
        {
            zombak.remove();
            Score+=20;
            alert(Score);
        }
        if(document.getElementsByClassName('zombi').length === 0)
        {
            round++;
        }
        console.log(zomb.health);
    })


    setInterval(() => {
        zombak.style.left = --startPosition + "%"
    }, 800);
    let GameField = document.getElementById('fealdGame');
    GameField.appendChild(zombak);
}


class zombiePrototype
{
    constructor(image , health)
    {
        this.image = image,
        this.health = health

    }
}


