import { gameExamples } from './2d/examples'
import { IcoSphereBuilder } from 'babylonjs'

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

export interface ICell {
    previousValue: number,
    value: number,
    friends: number,
}



export let settings = {
    space: 25,
    width: 24,
    size: 40,
    hasBoundary: true,
}

export function max(){
    return settings.size * settings.space
}

export function createGrid(){
    let grid: ICell[][] = []
    for(let i = 0;i < settings.size;i++){
        let row: ICell[] = []
        for(let j = 0;j < settings.size;j++){
            row.push({ value: 0, friends: 0, previousValue: -1 });
        }
        grid.push(row);
    }
    return grid;
}

export function setExample(grid: ICell[][], example: string){
    let ex = gameExamples.find(p => p.name == example)
    if(ex && grid.length > ex.data.length && grid[0].length > ex.data[0].length){
        let data = ex.data

        for(let i = 0;i < data.length;i++){
            for(let j = 0;j < data[i].length;j++){
                grid[j][i].previousValue = -1
                grid[j][i].value = data[i][j]
            }
        }
    }   
}

function log(str: any){
    //console.log(str);
}

function getNeighbors(grid: ICell[][], x: number, y: number){
    let n: ICell[] = []
    for(let i = x-1;i <= x+1;i++){
        for(let j = y-1;j <= y+1;j++){
            let xR = i;
            let yR = j;

            if(i == x && j == y){
                continue;
            }
            if(i < 0 ){
                if(settings.hasBoundary){
                    continue;
                }
                else {
                    xR = grid.length-1;
                }
            }
            else if(i == grid.length ){
                if(settings.hasBoundary){
                    continue;
                }
                else{
                    xR = 0;
                }
            }

            if(grid[xR].length == j){
                if(settings.hasBoundary){
                    continue;
                }
                else {
                    yR = 0;
                }
            }
            else if(j < 0){
                if(settings.hasBoundary){
                    continue
                }
                else {
                    yR = grid[0].length-1;
                }
            }
            //log(`${i},${j}`);
            n.push(grid[xR][yR])
            log('called')
        }
    }
    return n;
}

function getGridNeighbors(grid: ICell[][]){
    //let result: teststate[][] = [];
    for(let i = 0;i < grid.length;i++){

        //let row: teststate[] = []
        for(let j = 0;j < grid[i].length;j++){
            let current = grid[i][j];
            log('getting neighbors')
            let n = getNeighbors(grid, i, j);
            let count = n.filter(p => p.value == 1).length;
            let msg = `${i},${j}: `;
            log(msg + `count = ${count}`);
            log(n)

            grid[i][j].friends = count;
            //row.push({state: current, nCount: count});
        }

        //result.push(row);
    }
    //return result;
}

export function nextGen(grid: ICell[][]){
    getGridNeighbors(grid);
    for(let i = 0;i < grid.length;i++){
        for(let j = 0;j < grid[i].length;j++){
            let currentState = grid[i][j];
            let current = currentState.value;
            let count = currentState.friends;
            let msg = `${i},${j}: `;

            currentState.previousValue = currentState.value
            //1. Any live cell with 2 or 3 live neighbors survives.
            if(current == 1 && (count == 2 || count == 3)){
                log(msg + "keeping alive...")
            }
            //2. Any dead cell with three live neighbors becomes a live cell.
            else if(current == 0 && count == 3){
                grid[i][j].value = 1;
                log(msg + "came alive")
            }
            //3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
            else if(current == 1){
                grid[i][j].value = 0;
                log(msg + "dead")
            }
        }
    }

}
