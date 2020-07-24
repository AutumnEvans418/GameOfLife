export let settings = {
    space: 25,
    width: 24,
    size: 40,
    hasBoundary: true,
}

export function max(){
    return settings.size * settings.space
}

export interface ICell {
    previousValue: number,
    value: number,
    //nextFriends: number,
    friends: number,
    x: number,
    y: number,
    z: number,
}

export function log(str: any){
    //console.log(str);
}

export function updateCell(currentState: ICell, msg: string){
    let current = currentState.value;
    let count = currentState.friends;

    currentState.previousValue = currentState.value
    //1. Any live cell with 2 or 3 live neighbors survives.
    if(current == 1 && (count == 2 || count == 3)){
        log(msg + "keeping alive...")
    }
    //2. Any dead cell with three live neighbors becomes a live cell.
    else if(current == 0 && count == 3){
        //grid[i][j].value = 1;
        //update(1)
        currentState.value = 1;
        log(msg + "came alive")
    }
    //3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    else if(current == 1){
        //grid[i][j].value = 0;
        //update(0)
        currentState.value = 0;
        log(msg + "dead")
    }
}
