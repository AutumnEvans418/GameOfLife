import * as BABYLON from 'babylonjs';

import { createGrid, loop, nextGen } from '../life3d'
import { settings, ICell } from '../life';
import { Mesh } from 'babylonjs';
import { Cell, ActiveState, DeadState } from './cell'
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
grid[2][2][2].value = 1;
grid[3][3][3].value = 1;


// Get the canvas DOM element
var canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;


// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });



// CreateScene function that creates and return the scene
// Create a basic BJS Scene object
var scene = new BABYLON.Scene(engine);

var quarter = BABYLON.Tools.ToRadians(45)

let spacing = 10;
let size = 10;

let width = size * settings.size;
let half = width / 2;

//let middle = new BABYLON.Vector3(half,half,half);

var camera = new BABYLON.ArcRotateCamera("camera1", quarter * 3, quarter * 3, width * 3, BABYLON.Vector3.Zero(), scene);

let spheres: Cell[][][] = []

grid.forEach((p, i) => {
    let row: Cell[][] = []
    p.forEach((p, j) => {
        let depth: Cell[] = []
        p.forEach((p, d) => {
            let sphere = BABYLON.Mesh.CreateBox(`sphere${p.x}${p.y}${p.z}`, size, scene);
            sphere.position.x = p.x * spacing - half;
            sphere.position.y = p.y * spacing - half;
            sphere.position.z = p.z * spacing - half;
            let myMaterial = new BABYLON.StandardMaterial("on", scene);

            //myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
            //myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
            //myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
            //myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
            myMaterial.diffuseTexture = new BABYLON.Texture('../images/cobblestone.jpg', scene)
            myMaterial.alpha = 1;
            sphere.material = myMaterial;
            let cell = new Cell(sphere)
            update(cell, p);
            depth.push(cell)
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

let time = 0;
let delay = 200;
engine.runRenderLoop(function () {
    time++;

    loop(spheres, p => {
        p.state.update();
    })
    if (time % delay == 0) {
        nextGen(grid)
        loop(grid, p => {
            update(spheres[p.x][p.y][p.z], p)
        })
    }

    scene.render();

});
// the canvas/window resize event handler
window.addEventListener('resize', function () {
    engine.resize();
});
function update(sphere: Cell, p: ICell) {
    if (p.value == 1) {

        sphere.state = new ActiveState(sphere.mesh);
        //sphere.material.emissiveColor = new BABYLON.Color3(1, 0, 0)
    }
    else {

        sphere.state = new DeadState(sphere.mesh)
        //sphere.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    }
}
//scene.debugLayer.show()