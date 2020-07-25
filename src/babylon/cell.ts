import * as BABYLON from 'babylonjs'
import { StandardMaterial, Color3, Vector3 } from 'babylonjs';

function MoveTo(from: number,to:number, speed: number){
    let t = to - from;
    return from + t * speed
}

function MoveToVector3(from: Vector3, to: Vector3, speed:number){
    if(Math.abs(from.x - to.x) < 0.005)
    {
        return false;
    }
    from.x = MoveTo(from.x, to.x, speed);
    from.y = MoveTo(from.y, to.y, speed);
    from.z = MoveTo(from.z, to.z, speed);
    return true;
}

let speed = 0.1;

class State implements IState {
    mesh: BABYLON.InstancedMesh;
    scale: BABYLON.Vector3
    done: boolean;
    constructor(mesh: BABYLON.InstancedMesh, scale: BABYLON.Vector3){
        this.mesh = mesh;
        this.scale = scale;
        mesh.unfreezeWorldMatrix();
        mesh.setEnabled(true);
    }
    update(){
        if(this.done){
            return;
        }
        if(!MoveToVector3(this.mesh.scaling, this.scale, speed)){
            if(!this.mesh.isWorldMatrixFrozen){
                this.mesh.freezeWorldMatrix();
                this.complete();
            }
        }
    }
    complete(){
        this.done = true;
    }
}
export class ActiveState extends State {
    constructor(mesh: BABYLON.InstancedMesh){
        super(mesh, new BABYLON.Vector3(1,1,1))
        this.mesh.isVisible = true;
    }
}

export class DeadState extends State {
    constructor(mesh: BABYLON.InstancedMesh){
        super(mesh, Vector3.Zero());
    }

    complete(){
        super.complete();
        this.mesh.setEnabled(false);
        this.mesh.isVisible = false;
    }
}

interface IState {
    update(): void;
}

export class Cell {
    mesh: BABYLON.InstancedMesh;
    state: IState;
    constructor(mesh: BABYLON.InstancedMesh){
        this.mesh = mesh;
    }
}