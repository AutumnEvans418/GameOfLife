import * as BABYLON from 'babylonjs';
import { loop, nextGen } from '../life3d';
import { Vector3, StandardMaterial } from 'babylonjs';
import { Cell, ActiveState, DeadState } from './cell';
import { ICell, IGrid, IGridCell } from '../life';
//import { scene, grid, size, spacing, half, update, time, delay } from './babylon';
export class Grid3D {
    spheres: IGrid<Cell>;
    time = 0;
    delay = 50;
    grid: IGridCell
    scene: BABYLON.Scene;
    constructor(scene: BABYLON.Scene, grid: IGridCell, size: number, width: number, spacing: number) {
        this.grid = grid;
        this.scene = scene;
        
        let mat = this.createMaterial()
        
        this.createGrid(size, width, spacing, mat)
    }

    createMaterial(){
        let myMaterial = new BABYLON.StandardMaterial("on", this.scene);
        myMaterial.diffuseTexture = new BABYLON.Texture('../images/cobblestone.jpg', this.scene);
        myMaterial.alpha = 1;
        myMaterial.freeze();
        return myMaterial;
    }

    createGrid(size: number, width: number, spacing: number, mat: StandardMaterial){
        let half = width / 2;

        //This should reduce draw calls
        let mesh = BABYLON.Mesh.CreateBox(`root`, size, this.scene);
        mesh.isVisible = false;
        mesh.material = mat;
        mesh.convertToUnIndexedMesh();

        this.spheres = this.grid.convert(p => {
            let sphere = mesh.createInstance(`${p.x}${p.y}${p.z}`);
            sphere.position.x = p.x * spacing - half;
            sphere.position.y = p.y * spacing - half;
            sphere.position.z = p.z * spacing - half;
            sphere.scaling = Vector3.Zero();
            //sphere.material = mat;

            sphere.doNotSyncBoundingInfo = true;
            //sphere.convertToUnIndexedMesh()

            let cell = new Cell(sphere);
            this.updateCell(cell, p);
            return cell;
        })
        
    }

    updateCell(sphere: Cell, p: ICell) {
        if(p.value == p.previousValue){
            return;
        }
        if (p.value == 1) {
            sphere.state = new ActiveState(sphere.mesh);
        }
        else {
            sphere.state = new DeadState(sphere.mesh)
        }
        //sphere.state.speed;
    }
    update() {
        this.time++;
        this.spheres.loop(p => {
            p.state.update();
        });
        if (this.time % this.delay == 0) {
            nextGen(this.grid);
            this.grid.loop(p => {
                this.updateCell(this.spheres.get(p.x,p.y,p.z), p);
            });
        }
    }
}
