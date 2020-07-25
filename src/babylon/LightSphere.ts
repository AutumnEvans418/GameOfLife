import * as BABYLON from 'babylonjs';
import { Mesh, Vector3, Color3, PointLight, StandardMaterial } from 'babylonjs';
export class LightSphere {
    light: PointLight;
    sphere: Mesh;

    constructor(color: Color3, pos: Vector3, scene: BABYLON.Scene) {

        this.sphere = BABYLON.Mesh.CreateSphere('test', 16, 10, scene);

        this.sphere.material = new StandardMaterial('light', scene);

        this.light = new PointLight('light', Vector3.Zero(), scene);
        this.light.intensity = 0.2
        this.position = pos;
        this.color = color;
    }

    get position() {
        return this.light.position;
    }
    set position(v) {
        this.light.position = v;
        this.sphere.position = v;
    }

    set color(v: Color3) {
        this.light.diffuse = v;
        this.light.specular = v;
        let mat = this.sphere.material as StandardMaterial;
        mat.diffuseColor = Color3.Black();
        mat.specularColor = Color3.Black();
        mat.emissiveColor = v;
    }
}
