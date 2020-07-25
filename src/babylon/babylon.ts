import * as BABYLON from 'babylonjs';

import { createGrid } from '../life3d'
import { settings } from '../life';
import { Square, Noodle } from './SetInitialGrid';
import { RotatingCamera } from './RotatingCamera';
import { RotatingLights } from './RotatingLights';
import { Grid3D } from './Grid3D';

//export let time = 0;
//export let delay = 200;
settings.size = 15;
settings.hasBoundary = false;

export let grid = createGrid();
export let spacing = 10;
export let size = 10;

export let width = size * settings.size;
export let half = width / 2;
//Square(grid);
Noodle(grid);

// Get the canvas DOM element
export let canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

// Load the 3D engine
let engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
// Create a basic BJS Scene object
export let scene = new BABYLON.Scene(engine);

let grid3d = new Grid3D(scene, grid, size, width, spacing);

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