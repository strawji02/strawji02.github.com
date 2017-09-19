const canvas = document.getElementById('a');
const context = canvas.getContext('2d');

var div = document.getElementById("scorea");
var level = 1;
div.innerHTML = "game start!"

var img = new Image();
img.src = 'background.jpg'

const downKeys = {};

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function onKeyDown(event){
    downKeys[event.code] = true;
}

function onKeyUp(event){
    downKeys[event.code]=false;
}

function GameObject(src, width, height, speed = 1){
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = src;
    this.width = width -30;
    this.height = height -30;
    this.speed = speed;
    this.xy;
    this.xspeed;
    this.yspeed;
    this.alpha = 1;
    this.isObstacle = false;
    this.xOrY;
}

const player = new GameObject('hos.png', 100, 100, 10);
const obstacle = new GameObject('hos.png', 20,20);
const objectArray = [];

objectArray.push(player);

let score = 0;
let gameover = false;

setInterval (function checkScore(){
    
    if(gameover)
    return;
    else{
        // checkScore();
        score ++;
        div.innerHTML="점수 : " + score + "<br>레벨 : " + level;
        switch(score){
            case 10:
            level = 2;
            break;
            case 20:
            level = 3;
            break;
            case 30:
            levle = 4;
            break;
        }
        
    }
    // window.setTimeout("checkScore()", 1000);
}, 1000)
setInterval(function(){
    const newObstacle = new GameObject('hos.png', 20, 20);
    newObstacle.xOrY = Math.random() * 2;
    objectArray.push(newObstacle);
    newObstacle.isObstacle = true;
    
    
    newObstacle.xspeed = Math.random() * level * 2 + 3;
    newObstacle.yspeed = Math.random() * level * 2 + 3;
    
    console.log(newObstacle.xspeed , newObstacle.yspeed);
    
    newObstacle.xy = Math.ceil((Math.random() * 4) );
    // newObstacle.xy = 1;
    switch(newObstacle.xy){
        case 1:
        newObstacle.y = Math.random() * 330;
        newObstacle.x = 0;
        break;
        case 2:
        newObstacle.x = 770;
        newObstacle.y = Math.random() * 330;
        break;
        case 3:
        newObstacle.x = Math.random() * 330;
        newObstacle.y = 770;
        break;
        case 4:
        newObstacle.x = 770;
        newObstacle.y = Math.random() * 330 + 340;
        break;
    }
    
    
    console.log(newObstacle.xy)
    console.log(newObstacle.x);
    
}, 900 - level * 300);
window.requestAnimationFrame(run);

function run(){
    
    if(gameover) return;
    
    context.drawImage(img, 0, 0);
    // context.fillRect(0, 0, canvas.width, canvas.height);
    
    for(let obj of objectArray){
        
        context.globalAlpha = obj.alpha;
        
        context.drawImage(obj.image,
                    obj.x,obj.y,
                    obj.width, obj.height
                );
                
                if(obj == player) continue;

                if(obj.isObstacle){
                    switch(obj.xy){
                        case 1:
                        obj.x += obj.xspeed * obj.speed;
                        obj.y += obj.yspeed * obj.speed;
                        break;
                        case 2:
                        obj.x -= obj.xspeed * obj.speed;
                        obj.y += obj.yspeed * obj.speed;
                        break;
                        case 3:
                        obj.x += obj.xspeed * obj.speed;
                obj.y -= obj.yspeed * obj.speed;
                break;
                case 4:
                obj.x -= obj.xspeed * obj.speed;
                obj.y -= obj.yspeed * obj.speed;
                break;

            }
        }

        if(checkCollision(player, obj)){
            gameover = true;
        }
    }
    
    if(downKeys['ArrowLeft'])
        player.x -= player.speed;
    if(downKeys['ArrowRight'])
        player.x += player.speed;
    if(downKeys['ArrowUp'])
        player.y -= player.speed;
    if(downKeys['ArrowDown'])
        player.y += player.speed;
    if(player.x >= 800)
        player.x = 0;
    if(player.y >= 800)
        player.y = 0;
    if(player.x < 0)
        player.x = 800;
    if(player.y < 0)
        player.y = 800;
    window.requestAnimationFrame(run);
    
}

function checkCollision(a, b){
    //충돌체크
    //obj1과 obj2가 충돌했으면 true, 아니면  false 반환
    return !(a.x > b.x + b.width ||
        a.x + a.width < b.x ||
        a.y > b.y + b.height ||
        a.y + a.height < b.y)    
}