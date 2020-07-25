import { log, ICell, settings, updateCell } from './life'


export function createGrid() {
    let grid: ICell[][][] = []
    for (let i = 0; i < settings.size; i++) {
        let row: ICell[][] = []
        for (let j = 0; j < settings.size; j++) {
            let depth: ICell[] = []
            for (let z = 0; z < settings.size; z++) {
                depth.push({ value: 0, friends: 0, previousValue: -1, x: i, y: j, z: z });
            }
            row.push(depth);
        }
        grid.push(row);
    }
    return grid;
}




function getNeighbors(grid: ICell[][][], x: number, y: number, z: number) {
    let n: ICell[] = []

    let width = grid.length;
    let height = grid[0].length;
    let depth = grid[0][0].length;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            for (let d = z - 1; d <= z + 1; d++) {

                let xR = i;
                let yR = j;
                let zR = d;
                // Is it the same cell?
                if (i == x && j == y && d == z) {
                    continue;
                }
                if(d < 0) {
                    if(settings.hasBoundary){
                        continue;
                    }
                    else {
                        zR = depth - 1;
                    }
                }
                else if(d == depth){
                    if(settings.hasBoundary){
                        continue;
                    }
                    else {
                        zR = 0;
                    }
                }

                if (i < 0) {
                    if (settings.hasBoundary) {
                        continue;
                    }
                    else {
                        xR = width - 1;
                    }
                }
                else if (i == width) {
                    if (settings.hasBoundary) {
                        continue;
                    }
                    else {
                        xR = 0;
                    }
                }

                if (height == j) {
                    if (settings.hasBoundary) {
                        continue;
                    }
                    else {
                        yR = 0;
                    }
                }
                else if (j < 0) {
                    if (settings.hasBoundary) {
                        continue
                    }
                    else {
                        yR = height - 1;
                    }
                }
                //log(`${i},${j}`);
                n.push(grid[xR][yR][zR])
                log('called')
            }
        }
    }
    return n;
}

export function loop<T>(grid: T[][][], callback: (v: T) => void) {
    grid.forEach((p) => {
        p.forEach((j) => {
            j.forEach(v => {
                callback(v);
            })
        })
    })
}

export function nextGen(grid: ICell[][][]) {
    loop(grid, (v) => {
        let n = getNeighbors(grid, v.x, v.y, v.z);
        let count = n.filter(p => p.value == 1).length;
        v.friends = count;
    })
    loop(grid, (v) => {
        let msg = `${v.x},${v.y}: `;
        updateCell(v, msg);
    })
}