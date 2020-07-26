import { settings, ICell, IGridCell } from '../life';

export let examples = [
    'oscillator',
    'noodle',
    'square',
    'random'
]

export function GetExample(example: string, grid: IGridCell){
    if(example == 'oscillator'){
        Oscillator(grid);
    }
    if(example == 'noodle'){
        Noodle(grid);
    }
    if(example == 'square'){
        Square(grid);
    }
    if(example == 'random'){
        Random(grid);
    }
}

export function Random(grid: IGridCell){
    grid.loop(p => {
        let ran = Math.random();
        if(ran > 0.95){
            p.value = 1;
        }
    })
}

export function Oscillator(grid: IGridCell){
    // let halfSize = Math.floor(settings.size / 2)
    // let start = halfSize-1;
    // let end = start + 3;

    // for(let i = start;i < end;i++){
    //     for(let j = start;j < end;j++){
    //         for(let z = start;z < end;z++){
    //             if(i == halfSize || j == halfSize || z == halfSize){
    //                 continue;
    //             }
    //             let current = grid.get(i,j,z);
    //             current.value = 1;
                
    //         }
    //     }
    // }
    
    let data = [
        [
            [0,0,0],
            [0,1,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [1,1,1],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,1,0],
            [0,0,0]
        ]
    ]

    let halfSize = Math.floor(settings.size / 2)

    let half = halfSize - 1;

    let start = 0;
    let end = 3;
    for(let i = start;i < end;i++){
        for(let j = start;j < end;j++){
            for(let z = start;z < end;z++){
                
                let current = grid.get(i+half,j+half,z+half);
                let item = data[i][j][z]
                current.value = item;
       
            }
        }
    }
}

export function Square(grid: IGridCell) {
    let halfSize = Math.floor(settings.size / 2);
    let start = halfSize-1;
    let end = start + 3;

    for(let i = start;i < end;i++){
        for(let j = start;j < end;j++){
            for(let z = start;z < end;z++){
                grid.get(i,j,z).value = 1;
            }
        }
    }
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
