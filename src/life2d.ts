import { gameExamples } from './2d/examples'
import { IcoSphereBuilder } from 'babylonjs'
import { ICell, log, updateCell, settings } from './life'

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

export function createGrid(){
    let grid: ICell[][] = []
    for(let i = 0;i < settings.size;i++){
        let row: ICell[] = []
        for(let j = 0;j < settings.size;j++){
            row.push({ value: 0, friends: 0, previousValue: -1, x: i, y: j, z: -1 });
        }
        grid.push(row);
    }
    return grid;
}

export function setExample(grid: ICell[][], example: string){
    let ex = gameExamples.find(p => p.name == example)
    if(ex && grid.length > ex.data.length && grid[0].length > ex.data[0].length){
        let data = ex.data

        data.forEach((p,i) => {
            p.forEach((v,j) => {
                let cell = grid[j][i]
                cell.previousValue = -1;
                cell.value = v;
            })
        })
    }   
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

function loop<T>(grid: T[][], callback: (v: T) => void) {
    grid.forEach((p) => {
        p.forEach((v) => {
            callback(v);
        })
    })
}

export function nextGen(grid: ICell[][]){
    loop(grid, (v) => {
        let n = getNeighbors(grid, v.x, v.y);
        let count = n.filter(p => p.value == 1).length;
        v.friends = count;
    })
    loop(grid, (v) => {
        let msg = `${v.x},${v.y}: `;
        updateCell(v, msg);
    })
}
