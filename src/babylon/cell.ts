import * as BABYLON from 'babylonjs'
import { StandardMaterial, Color3, Vector3 } from 'babylonjs';

function MoveTo(from: number,to:number, speed: number){
    let t = to - from;
    return from + t * speed
}

function MoveToVector3(from: Vector3, to: Vector3, speed:number){
    from.x = MoveTo(from.x, to.x, speed);
    from.y = MoveTo(from.y, to.y, speed);
    from.z = MoveTo(from.z, to.z, speed);
}

export class ActiveState implements IState {
    mesh: BABYLON.Mesh;
    scale = new BABYLON.Vector3(1,1,1)
    constructor(mesh: BABYLON.Mesh){
        this.mesh = mesh;
    }
    update(){
        let mat = this.mesh.material as StandardMaterial
        let speed = 0.05;
        let clr = mat.emissiveColor;

        //clr.r = MoveTo(clr.r, 1, speed);
        //clr.g = MoveTo(clr.g, 0, speed);
        //clr.b = MoveTo(clr.b, 0, speed);
        MoveToVector3(this.mesh.scaling, this.scale, speed);

        //mat.alpha = MoveTo(mat.alpha, 0.5, speed);
    }
}

export class DeadState implements IState {
    mesh: BABYLON.Mesh;
    scale = new BABYLON.Vector3(0,0,0)
    constructor(mesh: BABYLON.Mesh){
        this.mesh = mesh;
    }
    update(){
        let mat = this.mesh.material as StandardMaterial
        let speed = 0.05;
        let clr = mat.emissiveColor;

        //clr.r = MoveTo(clr.r, 1, speed);
        //clr.g = MoveTo(clr.g, 1, speed);
        //clr.b = MoveTo(clr.b, 1, speed);

        MoveToVector3(this.mesh.scaling, this.scale, speed);
        //mat.alpha = MoveTo(mat.alpha, 0, speed);
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