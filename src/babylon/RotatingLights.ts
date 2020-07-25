import * as BABYLON from 'babylonjs';
import { Vector3, Color3 } from 'babylonjs';
import { LightSphere } from './LightSphere';
export class RotatingLights {
    light1: LightSphere;
    light2: LightSphere;
    alpha = 0;
    width: number;
    speed = 0.01;
    constructor(scene: BABYLON.Scene, width: number) {
        this.width = width;
        // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
        let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

        let lightPos = Vector3.Zero();
        //let lightPos2 = new Vector3(-width*4,-width*4,-width*4)
        this.light1 = new LightSphere(new Color3(1, 1, 0), lightPos, scene);

        this.light2 = new LightSphere(new Color3(0, 1, 0), lightPos, scene);

    }
    update() {
        this.light1.position = new BABYLON.Vector3(this.width * 2 * Math.sin(this.alpha), 0,-this.width * Math.cos(this.alpha));
        this.light2.position = new BABYLON.Vector3(this.width * 2 * Math.cos(this.alpha), 0, this.width * Math.sin(this.alpha));

        this.alpha += this.speed;
    }
}
