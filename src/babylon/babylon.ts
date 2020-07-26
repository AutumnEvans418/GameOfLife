import * as BABYLON from 'babylonjs';

import { createGrid, Grid, settings3d, regular, aggressive } from '../life3d'
import { settings, ICell } from '../life';
import { GetExample, examples } from './SetInitialGrid';
import { RotatingCamera } from './RotatingCamera';
import { RotatingLights } from './RotatingLights';
import { Grid3D } from './Grid3D';
import * as dat from 'dat.gui'
import { GroundBuilder } from 'babylonjs';

settings.size = 19;
settings.hasBoundary = true;

interface IExample {
    name: string
    start(): void;
}

let grid: Grid<ICell>;
let spacing = 10;
let size = 10;

export let width = size * settings.size;
//Square(grid);

let setups = [
    'regular',
    'aggressive'
]

class Actions{
    example = examples[0]
    setup = setups[0]
    reset(){
        grid = createGrid();
        GetExample(this.example, grid);
        if(grid3d){
            grid3d.grid = grid;
            grid3d.updateCells();
        }
        console.log('reseted!')
    }
    randomize(){
        settings3d.becomeAliveMin = Math.random() * 26;
        settings3d.becomeAliveMax = Math.random() * 26;
        settings3d.stayAliveMax = Math.random() * 26;
        settings3d.stayAliveMin = Math.random() * 26;
    }

}

let actions = new Actions();

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

//gui.add(settings,'size');


let simulationGui = gui.addFolder('Simulation');
simulationGui.open();

simulationGui.add(lights,'speed',0,0.3,0.01);
simulationGui.add(rotateCam,'cameraSpeed',0,0.05,0.005)
simulationGui.add(grid3d,'delay',10,200,1)
simulationGui.add(actions, 'example', examples).onChange(p => {
    actions.reset();
})
simulationGui.add(actions,'reset');


let parameters = gui.addFolder('Parameters');
parameters.add(settings,'hasBoundary');
parameters.add(settings3d,'becomeAliveMin', 0, 26,1);
parameters.add(settings3d,'becomeAliveMax', 0, 26,1);
parameters.add(settings3d,'stayAliveMin', 0, 26,1);
parameters.add(settings3d,'stayAliveMax', 0, 26,1);
parameters.add(actions,'randomize').onChange(p => {
    parameters.updateDisplay();
    actions.reset();
})
parameters.add(actions,'setup', setups).onChange(p => {
    if(actions.setup == 'regular'){
        settings3d.change(regular)
    }
    if(actions.setup == 'aggressive'){
        settings3d.change(aggressive);
    }
    parameters.updateDisplay();
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