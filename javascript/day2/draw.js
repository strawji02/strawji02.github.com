const canvas = document.getElementById('a')
const context = canvas.getContext('2d')

// context.font = '30px Arial'
// context.textBaseline = 'alphabetic';

// context.strokeStyle='red';
// context.fillStyle='blue'
// context.fillText("p", 10, 20);
// context.textBaseline = 'Middle';
// context.strokeText("otato", 27, 20);

const image = new Image();
image.src = 'hos.png';
let x = 0;
let y = 0;

image.addEventListener('load', function(){
    console.log(arguments)
    context.drawImage(image, x, y);
})

// window.addEventListener('keydown', function(evnet)
// {
//     console.log(event)

//     context.fillStyle = 'white';
//     context.fillRect(0, 0, canvas.width, canvas.height)

//     // switch(event.code){
//     //     case 'ArrowRight': x += 10; break;
//     //     case 'ArrowLeft' : x -= 10; break;
//     //     case 'ArrowDown' : y += 10; break;
//     //     case 'ArrowUp' : y -= 10; break;
//     // }

//    
//     context.drawImage(image, x, y);
// });

//방법2. 키보드 이벤트 + 배열사용
let downKey = {};
let msd = false;
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function onKeyDown(event){
    downKey[event.code] = true;
}
function onKeyUp(event){
    downKey[event.code] = false;
}

window.requestAnimationFrame(run);

function run(){
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, x, y);

    if(downKey['ArrowLeft'])
        x -= 10;
    else if(downKey['ArrowRight'])
        x += 10;
    if(downKey['ArrowUp'])
        y -= 10;
    else if(downKey['ArrowDown'])
        y += 10;

    window.requestAnimationFrame(run);
}

function getMousePosition(event)
{
    const rect = canvas.getBoundingClientRect();
    return {
        x:event.clientX - rect.left,
        y:event.clientY - rect.top
    }
}
//마우스
window.addEventListener('mousedown', function(event){
    if(getMousePosition(event).x >= x){
        if(getMousePosition(event).x <= x+191)
            if(getMousePosition(event).y >= y)
                if(getMousePosition(event).y <= y+264)
                    msd = true;
    }
})

window.addEventListener('mousemove', function(event){
    if(msd == true){
        x = getMousePosition(event).x
        y = getMousePosition(event).y
    }
    console.log("a");
})

window.addEventListener('mouseup', function(event){
    msd = false;
    console.log("b");
})