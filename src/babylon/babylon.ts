import * as BABYLON from 'babylonjs';

import { createGrid } from '../life3d'
import { settings } from '../life';
import { Square, Noodle } from './SetInitialGrid';
import { RotatingCamera } from './RotatingCamera';
import { RotatingLights } from './RotatingLights';
import { Grid3D } from './Grid3D';

settings.size = 19;
settings.hasBoundary = false;

let grid = createGrid();
let spacing = 10;
let size = 10;

export let width = size * settings.size;
//Square(grid);
Noodle(grid);

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