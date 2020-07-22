
class Life {
    x: number;
    y: number;
    neighbors: number;
    constructor(x: number, y:number, n:number){
        this.x = x;
        this.y = y;
        this.neighbors = n;
    }
}

/*
1. Any live cell with 2 or 3 live neighbors survives.
2. Any dead cell with three live neighbors becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/

/*
Implementation:
1. Store initial life
2. Get all neighbors for each life form
3. 
*/
let initial = [
    new Life(0,0,2),
    new Life(-1,0,1),
    new Life(1,0,1)
]

function nextGeneration(lives: Life[]){
    let nextGen: Life[] = []

    
}