import * as BABYLON from 'babylonjs';
import { loop, nextGen } from '../life3d';
import { Vector3 } from 'babylonjs';
import { Cell, ActiveState, DeadState } from './cell';
import { ICell } from '../life';
//import { scene, grid, size, spacing, half, update, time, delay } from './babylon';
export class Grid3D {
    spheres: Cell[][][] = [];
    time = 0;
    delay = 200;
    grid: ICell[][][]
    constructor(scene: BABYLON.Scene, grid: ICell[][][], size: number, width: number, spacing: number) {
        this.grid = grid;
        let half = width / 2;
        let myMaterial = new BABYLON.StandardMaterial("on", scene);
        myMaterial.diffuseTexture = new BABYLON.Texture('../images/cobblestone.jpg', scene);
        myMaterial.alpha = 1;

        grid.forEach((p, i) => {
            let row: Cell[][] = [];
            p.forEach((p, j) => {
                let depth: Cell[] = [];
                p.forEach((p, d) => {
                    let sphere = BABYLON.Mesh.CreateBox(`sphere${p.x}${p.y}${p.z}`, size, scene);
                    sphere.position.x = p.x * spacing - half;
                    sphere.position.y = p.y * spacing - half;
                    sphere.position.z = p.z * spacing - half;
                    sphere.scaling = Vector3.Zero();
                    sphere.material = myMaterial;
                    let cell = new Cell(sphere);
                    this.updateCell(cell, p);
                    depth.push(cell);
                });
                row.push(depth);
            });
            this.spheres.push(row);
        });

    }
    updateCell(sphere: Cell, p: ICell) {
        if (p.value == 1) {
            sphere.state = new ActiveState(sphere.mesh);
        }
        else {
    
            sphere.state = new DeadState(sphere.mesh)
        }
    }
    update() {
        this.time++;
        loop(this.spheres, p => {
            p.state.update();
        });
        if (this.time % this.delay == 0) {
            nextGen(this.grid);
            loop(this.grid, p => {
                this.updateCell(this.spheres[p.x][p.y][p.z], p);
            });
        }
    }
}
