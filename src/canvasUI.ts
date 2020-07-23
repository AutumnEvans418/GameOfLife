import {max, settings, createGrid, nextGen, setExample, gameExamples } from './life2d'
// Get the canvas DOM element
let canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;


function resizeCanvas(){
    canvas.width = max();
    canvas.height = max();
}

resizeCanvas();

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

let examples = document.getElementById('examples') as HTMLSelectElement;

gameExamples.forEach(p => {
    examples.innerHTML += `<option>${p.name}</option>`
})

examples.onchange = e => {
    resetGrid()
    setExample(grid, examples.value)
    startGame()
}

let delayInput = document.getElementById('delay') as HTMLInputElement;
let delay = 100;
delayInput.onchange = e => {
    delay = Number.parseInt(delayInput.value)
}

let zoomSlider = document.getElementById('zoom') as HTMLInputElement;
zoomSlider.onchange = e => {

    settings.space = Number.parseInt(zoomSlider.value);
    settings.width = settings.space * 0.9;
    console.log('change')
    resizeCanvas()
    draw(grid)
}
let size = document.getElementById('size') as HTMLInputElement;

size.onchange = () => {
    settings.size = Number.parseInt(size.value)
    resizeCanvas()
    grid = createGrid()
    draw(grid)
}

let isRunning = false;
function repeat(){
    nextGen(grid);
    draw(grid);
    if(isRunning){
        setTimeout(repeat, delay);
    }
}
pause.onclick = () => {
    isRunning = false;

}

function startGame(){
    isRunning = true;
    repeat();
}

start.onclick = () => {
    startGame();
}

function resetGrid(){
    isRunning = false;
    grid = createGrid();
    draw(grid)
}

reset.onclick = () => {
    resetGrid()
}



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
