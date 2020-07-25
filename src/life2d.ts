import { gameExamples } from './2d/examples'
import { ICell, log, updateCell, settings, IGrid, IGridCell } from './life'

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
    return new Grid(grid);
}

export class Grid<T> implements IGrid<T> {
    constructor(grid: T[][]){
        this.grid = grid;
    }
    loop(callback: (v: T) => void): void {
        loop(this.grid, callback);
    }
    get(x: number, y: number, z: number): T {
        return this.grid[x][y];
    }
    grid: T[][]
    get width(){
        return this.grid.length
    }
    get height(){
        return this.grid[0].length
    }
    get depth(){
        return -1;
    }
    convert<A>(con: (item: T) => A): IGrid<A> {
        let items: A[][] = []

        this.grid.forEach(p => {
            let row: A[] = []
            p.forEach(p => {
                row.push(con(p))
            })
            items.push(row)
        })
        return new Grid(items);
    }
}


function getNeighbors(grid: IGrid<ICell>, x: number, y: number){
    let n: ICell[] = []

    let width = grid.width;
    let height = grid.height;

    for(let i = x-1;i <= x+1;i++){
        for(let j = y-1;j <= y+1;j++){
            let xR = i;
            let yR = j;

            // Is it the same cell?
            if(i == x && j == y){
                continue;
            }
            if(i < 0){
                if(settings.hasBoundary){
                    continue;
                }
                else {
                    xR = width-1;
                }
            }
            else if(i == width){
                if(settings.hasBoundary){
                    continue;
                }
                else{
                    xR = 0;
                }
            }

            if(height == j){
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
                    yR = height-1;
                }
            }
            //log(`${i},${j}`);
            n.push(grid.get(xR,yR,0))
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

export function nextGen(grid: IGridCell){
    grid.loop((v) => {
        let n = getNeighbors(grid, v.x, v.y);
        let count = n.filter(p => p.value == 1).length;
        v.friends = count;
    })
    grid.loop((v) => {
        let msg = `${v.x},${v.y}: `;
        updateCell(v, msg, n => n == 2 || n == 3, n => n == 3);
    })
}

export function setExample(grid: IGridCell, example: string){
    let ex = gameExamples.find(p => p.name == example)
    if(ex && grid.width > ex.data.length && grid.height > ex.data[0].length){
        let data = ex.data

        data.forEach((p,i) => {
            p.forEach((v,j) => {
                let cell = grid.get(j,i,0);
                cell.previousValue = -1;
                cell.value = v;
            })
        })
    }   
}
