import * as BABYLON from 'babylonjs';

import { createGrid, loop, nextGen } from '../life3d'
import { settings, ICell } from '../life';
import { Mesh, Vector3, Color3, PointLight, StandardMaterial } from 'babylonjs';
import { Cell, ActiveState, DeadState } from './cell'
import { SetInitialGrid } from './SetInitialGrid';
import { Scene } from 'phaser';
settings.size = 10;
settings.hasBoundary = false;
let grid = createGrid();


SetInitialGrid(grid);


// Get the canvas DOM element
var canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;


// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

class LightSphere {
    light: PointLight
    sphere: Mesh

    constructor(color: Color3, pos: Vector3, scene: BABYLON.Scene){
        
        this.sphere = BABYLON.Mesh.CreateSphere('test', 16, 10, scene);

        this.sphere.material = new StandardMaterial('light', scene)

        this.light = new PointLight('light', Vector3.Zero(), scene);

        this.position = pos;
        this.color = color;
    }

    get position(){
        return this.light.position
    }
    set position(v){
        this.light.position = v;
        this.sphere.position = v;
    }

    set color(v: Color3){
        this.light.diffuse = v;
        this.light.specular = v;
        let mat = this.sphere.material as StandardMaterial
        mat.diffuseColor = Color3.Black()
        mat.specularColor = Color3.Black()
        mat.emissiveColor = v;
    }
}

// CreateScene function that creates and return the scene
// Create a basic BJS Scene object
var scene = new BABYLON.Scene(engine);

var quarter = BABYLON.Tools.ToRadians(45)

let spacing = 10;
let size = 10;

let width = size * settings.size;
let half = width / 2;

//let middle = new BABYLON.Vector3(half,half,half);

var camera = new BABYLON.ArcRotateCamera("camera1", quarter, quarter, width * 3, BABYLON.Vector3.Zero(), scene);

let spheres: Cell[][][] = []
let myMaterial = new BABYLON.StandardMaterial("on", scene);
myMaterial.diffuseTexture = new BABYLON.Texture('../images/cobblestone.jpg', scene)
myMaterial.alpha = 1;

grid.forEach((p, i) => {
    let row: Cell[][] = []
    p.forEach((p, j) => {
        let depth: Cell[] = []
        p.forEach((p, d) => {
            let sphere = BABYLON.Mesh.CreateBox(`sphere${p.x}${p.y}${p.z}`, size, scene);
            sphere.position.x = p.x * spacing - half;
            sphere.position.y = p.y * spacing - half;
            sphere.position.z = p.z * spacing - half;
            sphere.scaling = Vector3.Zero();
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

let lightPos = Vector3.Zero();
//let lightPos2 = new Vector3(-width*4,-width*4,-width*4)

let light1 = new LightSphere(new Color3(1,1,0), lightPos, scene);

let light2 = new LightSphere(new Color3(0,1,0), lightPos, scene);

let time = 0;
let delay = 200;

let cameraSpeed = 0.005;

let alpha = 0;
engine.runRenderLoop(function () {
    time++;
    alpha += 0.01;
    light1.position = new BABYLON.Vector3(width*2 * Math.sin(alpha), 0, -width * Math.cos(alpha));
    light2.position = new BABYLON.Vector3(width*2 * Math.cos(alpha), 0, width * Math.sin(alpha));

    camera.alpha += 1 * cameraSpeed;
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