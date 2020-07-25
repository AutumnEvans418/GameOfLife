import * as BABYLON from 'babylonjs';

import { createGrid, Grid } from '../life3d'
import { settings, ICell } from '../life';
import { Square, Noodle } from './SetInitialGrid';
import { RotatingCamera } from './RotatingCamera';
import { RotatingLights } from './RotatingLights';
import { Grid3D } from './Grid3D';
import * as dat from 'dat.gui'
import { GroundBuilder } from 'babylonjs';

settings.size = 19;
settings.hasBoundary = false;

interface IExample {
    name: string
    start(): void;
}

let grid: Grid<ICell>;
let spacing = 10;
let size = 10;

export let width = size * settings.size;
//Square(grid);

let examples = [
    'noodle',
    'square'
]

let actions = {
    example: examples[0],
    reset(){
        grid = createGrid();
        if(this.example == 'noodle'){
            Noodle(grid);
        }
        if(this.example == 'square'){
            Square(grid);
        }
        if(grid3d){
            grid3d.grid = grid;
            grid3d.updateCells();
        }
        console.log('reseted!')
    }
}

actions.reset();

// Get the canvas DOM element
let canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

// Load the 3D engine
let engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
// Create a basic BJS Scene object
let scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0,0,0,1);
let grid3d = new Grid3D(scene, grid, size, width, spacing);
grid3d.delay = 200;
let rotateCam = new RotatingCamera(scene, canvas, width);

let lights = new RotatingLights(scene, width);





let gui = new dat.GUI();

gui.add(settings,'size');
gui.add(settings,'hasBoundary');
gui.add(lights,'speed',0,0.3,0.01);
gui.add(rotateCam,'cameraSpeed',0,0.05,0.005)
gui.add(grid3d,'delay',10,200,1)
gui.add(actions,'reset');
gui.add(actions, 'example', examples).onChange(p => {
    actions.reset();
})

engine.runRenderLoop(function () {
    lights.update()
    rotateCam.update();
    grid3d.update();
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function () {
    engine.resize();
});
scene.blockMaterialDirtyMechanism = true;
//scene.debugLayer.show()