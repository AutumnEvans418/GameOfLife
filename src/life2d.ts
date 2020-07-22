// Get the canvas DOM element
let canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

class State {
    x: number;
    y: number;
    neighbors: number;
    alive: boolean;
    constructor(x: number, y:number, n:number, alive: boolean){
        this.x = x;
        this.y = y;
        this.neighbors = n;
        this.alive = alive;
    }
}

/*
1. Any live cell with 2 or 3 live neighbors survives.
2. Any dead cell with three live neighbors becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/

/*
Implementation:
- Store initial life
- Get all neighbors for each life form
    - if the abs(x - x) = 1 && abs(y - y) = 1 then neighbor
- for each
    - If the dead form friendcount = 3, become alive 
    - If the life form friend count = 2 or 3, no change.
    - else die
*/

function createGrid(){
    let size = 100;
    let grid: number[][] = []
    for(let i = 0;i < size;i++){
        let row: number[] = []
        for(let j = 0;j < size;j++){
            row.push(0);
        }
        grid.push(row);
    }
    return grid;
}

function setState(grid: number[][]){
    grid[1][5] = 1;
    grid[2][5] = 1;
    grid[3][5] = 1;
    grid[4][5] = 1;
    grid[5][5] = 1;
}

function log(str: any){
    //console.log(str);
}

function getNeighbors(grid: number[][], x: number, y: number){
    let n: number[] = []
    for(let i = x-1;i <= x+1;i++){
        for(let j = y-1;j <= y+1;j++){
            if(i == x && j == y){
                continue;
            }
            if(i < 0 || j < 0){
                continue;
            }
            if(i == grid.length || grid[i].length == j){
                continue;
            }
            //log(`${i},${j}`);
            n.push(grid[i][j])
        }
    }
    return n;
}
interface teststate{
    state: number
    nCount: number
}
function getGridNeighbors(grid: number[][]){
    let result: teststate[][] = [];
    for(let i = 0;i < grid.length;i++){

        let row: teststate[] = []
        for(let j = 0;j < grid[i].length;j++){
            let current = grid[i][j];

            let n = getNeighbors(grid, i, j);
            let count = n.filter(p => p == 1).length;
            let msg = `${i},${j}: `;
            //log(msg + `count = ${count}`);
            //log(n)
            row.push({state: current, nCount: count});
        }

        result.push(row);
    }
    return result;
}

function nextGen(grid: number[][]){
    let ns = getGridNeighbors(grid);
    for(let i = 0;i < ns.length;i++){
        for(let j = 0;j < ns[i].length;j++){
            let currentState = ns[i][j];
            let current = currentState.state;
            let count = currentState.nCount;
            let msg = `${i},${j}: `;

            //1. Any live cell with 2 or 3 live neighbors survives.
            if(current == 1 && (count == 2 || count == 3)){
                log(msg + "keeping alive...")
            }
            //2. Any dead cell with three live neighbors becomes a live cell.
            else if(current == 0 && count == 3){
                grid[i][j] = 1;
                log(msg + "came alive")
            }
            //3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
            else if(current == 1){
                grid[i][j] = 0;
                log(msg + "dead")
            }
        }
    }

}
let context = canvas.getContext('2d');

//context.fillStyle = "color: #ffffff";
//context.fillRect(0,0,100,100);
function draw(grid: number[][]){
    let space = 20;
    let width = 9;

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

let grid = createGrid();
setState(grid);
log(grid);



function repeat(){
    nextGen(grid);
    draw(grid);
    setTimeout(repeat, 100);
}
repeat();

//nextGen(grid);
//draw(grid);