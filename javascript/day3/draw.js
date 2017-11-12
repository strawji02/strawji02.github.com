const canvas = document.getElementById('a');
const context = canvas.getContext('2d');



const downKeys = {};

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function onKeyDown(event){
    downKeys[event.code] = true;
}

function onKeyUp(event){
    downKeys[event.code]=false;
}

function GameObject(src, width, height, speed){
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = src;
    this.width = width -30;
    this.height = height -30;
    this.speed = speed;
    this.alpha = 1;
    this.isObstacle = false;
}

const player = new GameObject('hos.png', 100, 100, 10);
const obstacle = new GameObject('hos.png', 150,150);2
const objectArray = [];

objectArray.push(player);


setInterval(function(){
    const newObstacle = new GameObject('hos.png', 150, 150);
    objectArray.push(newObstacle);
    newObstacle.isObstacle = true;
    
    newObstacle.speed = Math.random() * 6;
    newObstacle.x = Math.random() * 770;
    newObstacle.y = -newObstacle.height;
}, 1000);

let gameover = false;

window.requestAnimationFrame(run());

function run(){
    
    if(gameover) return;

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for(let obj of objectArray){

        context.globalAlpha = obj.alpha;
        
                context.drawImage(obj.image,
                    obj.x,obj.y,
                    obj.width, obj.height
                );

        if(obj == player) continue;

        if(obj.isObstacle){
            obj.y += obj.speed;
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
        player.y = 0;++
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