const canvas = document.getElementById('a');
const context = canvas.getContext('2d');

context.font='50px Arial';
context.strokeStyle = 'red';
context.textBaseline = 'alphabetic';
// context.strokeText('Hello, world!', 10, 70);

const image = new Image();
image.src = 'hos.png';

let x = 0;
let y = 0;

image.addEventListener('load', function() {
    console.log(arguments);
    console.log(event);
    context.drawImage(image, x, y, 100, 100);
    
});
//방법1. 단순한 방법(이벤트 리스너만 사용)
// window.addEventListener('keydown', function(event){
//     //console.log(event);
    
//     context.fillStyle = 'white';
//     context.fillRect(0,0,canvas.width, canvas.height);

//     switch(event.code){
//         case 'ArrowRight':
//         x+= 10;
//         break;

//         case 'ArrowLeft':
//         x-= 10;
//         break;

//         case 'ArrowUp':
//         y-= 10;
//         break;

//         case 'ArrowDown':
//         y+= 10;
//         break;
        

//     }
    

//     context.drawImage(image, x, y);
// })

//방법 2. 키보드 이벤트 + 배열 사용

let downKeys = {};

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function onKeyDown(event){
    downKeys[event.code] = true;
}

function onKeyUp(event){
    downKeys[event.code]=false;
}

window.requestAnimationFrame(run);

function run(){
    // context.fillStyle = 'white';
    // context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(image,x,y);
    
    if(downKeys['ArrowLeft'])
        x -= 10;
    if(downKeys['ArrowRight'])
        x += 10;
    if(downKeys['ArrowUp'])
        y -= 10;
    if(downKeys['ArrowDown'])
        y += 10;
    if(x >= 800)
        x = 0;
    if(y >= 800)
        y = 0;
    if(x < 0)
        x = 800;
    if (y < 0)
        y = 800;
    window.requestAnimationFrame(run);
}

// function getMousePosition(event){
//     const rect=canvas.getBoundingClientRect();
//     return{
//         x:event.clientX - rect.left,
//         y:event.clientY - rect.top
//     }
// }
// function moveImage(event){
//     window.addEventListener('mousemove', function(){
//         console.log(event);
//         let a = getMousePosition(event);
//         x = a.x;
//         y = a.y;
//         context.drawImage(image, x, y, 100, 100);
//     })
// }
// window.addEventListener('mousedown', function(event){
//     let can = getMousePosition(event);
//     console.log({x : event.clientX, y : event.clientY});
//     // if((can.x >= x && can.x <= x + 100) && (can.y >= y && can.y <= y+100)){
//     moveImage(event);
// })
