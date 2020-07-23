import {max, settings, createGrid, nextGen } from './life2d'
// Get the canvas DOM element
let canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
canvas.width = max();
canvas.height = max();
let context = canvas.getContext('2d');

let grid = createGrid();


function draw(grid: number[][]){
    context.clearRect(0,0,canvas.width,canvas.height);
    let space = settings.space;
    let width = settings.width;
    for(let i = 0;i < grid.length;i++){
        for(let j = 0;j < grid[i].length;j++){
            let current = grid[i][j];
            if(current == 1){
                context.fillStyle = "black";
            }
            else{
                context.fillStyle = "lightgray";
            }
            context.fillRect(i*space,j*space,width,width);
        }
    }
}

let start = document.getElementById('start');
let reset = document.getElementById('reset');
let pause = document.getElementById('pause');

let sizeSlider = document.getElementById('size') as HTMLInputElement;
let isRunning = false;
function repeat(){
    nextGen(grid);
    draw(grid);
    if(isRunning){
        setTimeout(repeat, 100);
    }
}
pause.onclick = () => {
    isRunning = false;

}
start.onclick = () => {
    isRunning = true;
    repeat();
}
reset.onclick = () => {
    isRunning = false;
    grid = createGrid();
}
sizeSlider.onchange = e => {

    settings.space = Number.parseInt(sizeSlider.value);
    settings.width = settings.space * 0.9;
    console.log('change')
    draw(grid)
}

let con = document.getElementById('container')



canvas.onclick = e => {

    //console.log(con.scrollTop)

    const rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / settings.space);
    let y = Math.floor((e.clientY - rect.top) / settings.space);
    let current = grid[x][y];
    let result = 0;
    if(current == 0){
        result = 1;
    }
    grid[x][y] = result;
    draw(grid)
}
draw(grid);
