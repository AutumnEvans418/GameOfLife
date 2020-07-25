import 'bootstrap/dist/css/bootstrap.min.css'

import { createGrid, nextGen, setExample, } from './life2d'
import { gameExamples } from './2d/examples'
import { ICell, max, settings, IGrid, IGridCell } from './life';
// Get the canvas DOM element
let canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;


function resizeCanvas(){
    canvas.width = max();
    canvas.height = max();
}

resizeCanvas();

let context = canvas.getContext('2d');

let grid = createGrid();


function clear(){
    context.clearRect(0,0,canvas.width,canvas.height);
}

function draw(grid: IGridCell){
    let space = settings.space;
    let width = settings.width;
    grid.loop(current => {
        if(current.value != current.previousValue){
            let i = current.x;
            let j = current.y;
            if(current.value == 1){
                context.fillStyle = `rgb(0,0,0)`;
            }
            else{
                context.fillStyle = "lightgray";
            }
            context.fillRect(i*space,j*space,width,width);
        }
    })
}

let start = document.getElementById('start');
let reset = document.getElementById('reset');
let pause = document.getElementById('pause');

let boundary = document.getElementById('boundary') as HTMLInputElement;

boundary.checked = settings.hasBoundary

boundary.onchange = () => {
    settings.hasBoundary = boundary.checked
}

let examples = document.getElementById('examples') as HTMLSelectElement;

gameExamples.forEach(p => {
    examples.innerHTML += `<option>${p.name}</option>`
})

examples.onchange = e => {
    resetGrid()
    setExample(grid, examples.value)
    draw(grid)
    //startGame()
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
    clear()
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

let currentTimeout: NodeJS.Timeout

function repeat(){
    nextGen(grid);
    draw(grid);
    if(isRunning){
       currentTimeout = setTimeout(repeat, delay);
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
    clearTimeout(currentTimeout)
}

reset.onclick = () => {
    resetGrid()
}



canvas.onclick = e => {

    //console.log(con.scrollTop)

    const rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / settings.space);
    let y = Math.floor((e.clientY - rect.top) / settings.space);
    let current = grid.get(x,y,0);
    let result = 0;
    if(current.value == 0){
        result = 1;
    }
    grid.get(x,y,0).value = result;
    draw(grid)
}
draw(grid);
