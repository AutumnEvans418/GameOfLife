import { settings, ICell, IGridCell } from '../life';

let oscillator = 'oscillator tube'
let oscillatorCube = 'oscillator cube'
let noodle = 'noodle'

export let examples = [
    'cube',
    oscillator,
    noodle,
    oscillatorCube,
    'random',
]

export function GetExample(example: string, grid: IGridCell){
    if(example == 'cube'){
        Square(grid, 2)
    }
    if(example == oscillator){
        Oscillator(grid);
    }
    if(example == noodle){
        Noodle(grid);
    }
    if(example == oscillatorCube){
        Square(grid, 3);
    }
    if(example == 'random'){
        Random(grid);
    }
}

function Plane(grid: IGridCell){
    let halfSize = Math.floor(settings.size / 2)
    
    grid.loop(p => {
        if(p.x == 0){
            p.value = 1;

        }
    })
}

function Random(grid: IGridCell){
    grid.loop(p => {
        let ran = Math.random();
        if(ran > 0.95){
            p.value = 1;
        }
    })
}

function Oscillator(grid: IGridCell){
    
    let data = [
        [
            [1,0,1],
            [0,0,0],
            [1,0,1]
        ],
        [
            [1,0,1],
            [0,0,0],
            [1,0,1]
        ],
        [
            [1,0,1],
            [0,0,0],
            [1,0,1]
        ]
    ]

    render(data, grid);
}

function render(data: number[][][], grid: IGridCell){
    let halfSize = Math.floor(settings.size / 2)

    let half = halfSize - Math.floor(data.length / 2);

    let start = 0;
    //let end = data.length;
    for(let i = start;i < data.length;i++){
        for(let j = start;j < data[i].length;j++){
            for(let z = start;z < data[i][j].length;z++){
                
                let current = grid.get(i+half,j+half,z+half);
                let item = data[i][j][z]
                current.value = item;
       
            }
        }
    }
}


function Square(grid: IGridCell, size: number) {
    let halfSize = Math.floor(settings.size / 2);
    let start = halfSize - Math.floor(size / 2);
    let end = start + size;

    for(let i = start;i < end;i++){
        for(let j = start;j < end;j++){
            for(let z = start;z < end;z++){
                grid.get(i,j,z).value = 1;
            }
        }
    }
}

function Noodle(grid: IGridCell) {
    let data = [
        [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
    ]

    render(data, grid);
    
    // let halfSize = Math.floor(settings.size / 2);

    // grid.loop(p => {
    //     if(p.x == halfSize && p.y == halfSize){
    //         p.value = 1
    //     }
    //     else if(p.y == halfSize && p.z == halfSize){
    //         p.value = 1;
    //     }
    // });


    //grid.forEach(p => p[halfSize][halfSize].value = 1)
}
