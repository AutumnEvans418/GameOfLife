import * as BABYLON from 'babylonjs'
import { StandardMaterial } from 'babylonjs';
class State implements IState {
    duration: number;
    currentColor: BABYLON.Color3;
    color: BABYLON.Color3;
    increment: BABYLON.Color3;
    constructor(mesh: BABYLON.Mesh, duration:number, color: BABYLON.Color3){
        this.color = color;
        if(mesh.material instanceof BABYLON.StandardMaterial){
            this.currentColor = mesh.material.emissiveColor;
        }

        this.duration = duration;

        let r = (this.currentColor.r - this.color.r)/duration;
        let g = (this.currentColor.g - this.color.g)/duration;
        let b = (this.currentColor.b - this.color.b)/duration;
        this.increment = new BABYLON.Color3(r,g,b);
    }

    update(): void {
        if(this.currentColor.r != this.color.r){
            this.currentColor.add(this.increment);
        }
    }
}

export class ActiveState extends State {
    constructor(mesh: BABYLON.Mesh){
        super(mesh, 100, new BABYLON.Color3(1,0,0))

        let mat = mesh.material as StandardMaterial
        mat.emissiveColor = this.color;
    }

    update(){

    }
}


export class DeadState extends State {
    constructor(mesh: BABYLON.Mesh){
        super(mesh, 100, new BABYLON.Color3(1,1,1))

        let mat = mesh.material as StandardMaterial
        mat.emissiveColor = this.color;
    }

    update(){

    }
}

interface IState {
    update(): void;
}

export class Cell {
    mesh: BABYLON.Mesh;
    state: IState;
    constructor(mesh: BABYLON.Mesh){
        this.mesh = mesh;
    }
}