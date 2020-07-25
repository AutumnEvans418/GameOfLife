import * as BABYLON from 'babylonjs';

import { createGrid, loop, nextGen } from '../life3d'
import { settings, ICell } from '../life';
import { Mesh } from 'babylonjs';

settings.size = 10;

let grid = createGrid();

grid[0][0][0].value = 1;
grid[0][1][0].value = 1;
grid[1][0][0].value = 1;
grid[1][1][0].value = 1;
grid[0][0][1].value = 1;
grid[0][1][1].value = 1;
grid[1][0][1].value = 1;
grid[1][1][1].value = 1;
// Get the canvas DOM element
var canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;


// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

function update(sphere: BABYLON.Mesh, p: ICell, on: BABYLON.Material, off: BABYLON.Material) {
    if (p.value == 1) {
        sphere.material = on;
    }
    else {
        sphere.material = off;
    }
}

// CreateScene function that creates and return the scene
// Create a basic BJS Scene object
var scene = new BABYLON.Scene(engine);

var quarter = BABYLON.Tools.ToRadians(45)

let spacing = 10;
let size = 5;

let width = size * settings.size;
let half = width / 2;

var camera = new BABYLON.ArcRotateCamera("camera1", quarter, quarter, width, BABYLON.Vector3.Zero(), scene);

let myMaterial = new BABYLON.StandardMaterial("on", scene);

myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

myMaterial.alpha = 0.5;

let onChange = new BABYLON.StandardMaterial("off", scene);

onChange.diffuseColor = new BABYLON.Color3(1, 0, 1);
onChange.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
onChange.emissiveColor = new BABYLON.Color3(1, 0, 0);
onChange.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
onChange.alpha = 0.5

let spheres: BABYLON.Mesh[][][] = []

grid.forEach((p, i) => {
    let row: BABYLON.Mesh[][] = []
    p.forEach((p, j) => {
        let depth: Mesh[] = []
        p.forEach((p, d) => {
            let sphere = BABYLON.Mesh.CreateBox(`sphere${p.x}${p.y}${p.z}`, size, scene);
            sphere.position.x = p.x * spacing - half;
            sphere.position.y = p.y * spacing - half;
            sphere.position.z = p.z * spacing - half;

            update(sphere, p, onChange, myMaterial);
            depth.push(sphere)
        })
        row.push(depth)
    })
    spheres.push(row);
})


// Target the camera to scene origin
camera.setTarget(BABYLON.Vector3.Zero());
//test
camera.keysUp.push(87);
camera.keysDown.push(83);
camera.keysLeft.push(65);
camera.keysRight.push(68);

// Attach the camera to the canvas
camera.attachControl(canvas, false);
// Create a basic light, aiming 0, 1, 0 - meaning, to the sky
var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
// Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
// Move the sphere upward 1/2 of its height
// Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
//var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
// Return the created scene
// call the createScene function
//var scene = createScene();
// run the render loop

let time = 0;

engine.runRenderLoop(function () {
    time++;

    if (time % 100 == 0) {
        nextGen(grid)
        loop(grid, p => {
            update(spheres[p.x][p.y][p.z], p, onChange, myMaterial)
        })
    }

    scene.render();

});
// the canvas/window resize event handler
window.addEventListener('resize', function () {
    engine.resize();
});