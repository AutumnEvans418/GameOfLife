import { settings, ICell } from '../life';


export function Square(grid: ICell[][][]) {
    let halfSize = Math.floor(settings.size / 2);

    grid[halfSize + 0][halfSize + 0][halfSize + 0].value = 1;
    grid[halfSize + 0][halfSize + 1][halfSize + 0].value = 1;
    grid[halfSize + 1][halfSize + 0][halfSize + 0].value = 1;
    grid[halfSize + 1][halfSize + 1][halfSize + 0].value = 1;
    grid[halfSize + 0][halfSize + 0][halfSize + 1].value = 1;
    grid[halfSize + 0][halfSize + 1][halfSize + 1].value = 1;
    grid[halfSize + 1][halfSize + 0][halfSize + 1].value = 1;
    grid[halfSize + 1][halfSize + 1][halfSize + 1].value = 1;
    grid[halfSize + 2][halfSize + 2][halfSize + 2].value = 1;
    grid[halfSize + 3][halfSize + 3][halfSize + 3].value = 1;
}

export function Noodle(grid: ICell[][][]) {
    let halfSize = Math.floor(settings.size / 2);

    grid[halfSize][halfSize].forEach(p => p.value = 1);

    grid.forEach(p => p[halfSize][halfSize].value = 1)
}
