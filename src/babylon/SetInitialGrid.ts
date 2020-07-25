import { settings, ICell, IGridCell } from '../life';


export function Square(grid: IGridCell) {
    let halfSize = Math.floor(settings.size / 2);

    grid.get(halfSize + 0,halfSize + 0,halfSize + 0).value = 1;
    grid.get(halfSize + 0,halfSize + 1,halfSize + 0).value = 1;
    grid.get(halfSize + 1,halfSize + 0,halfSize + 0).value = 1;
    grid.get(halfSize + 1,halfSize + 1,halfSize + 0).value = 1;
    grid.get(halfSize + 0,halfSize + 0,halfSize + 1).value = 1;
    grid.get(halfSize + 0,halfSize + 1,halfSize + 1).value = 1;
    grid.get(halfSize + 1,halfSize + 0,halfSize + 1).value = 1;
    grid.get(halfSize + 1,halfSize + 1,halfSize + 1).value = 1;
    grid.get(halfSize + 2,halfSize + 2,halfSize + 2).value = 1;
    grid.get(halfSize + 3,halfSize + 3,halfSize + 3).value = 1;
}

export function Noodle(grid: IGridCell) {
    let halfSize = Math.floor(settings.size / 2);

    grid.loop(p => {
        if(p.x == halfSize && p.y == halfSize){
            p.value = 1
        }
        else if(p.y == halfSize && p.z == halfSize){
            p.value = 1;
        }
    });


    //grid.forEach(p => p[halfSize][halfSize].value = 1)
}
