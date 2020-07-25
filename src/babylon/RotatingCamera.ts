import * as BABYLON from 'babylonjs';
export class RotatingCamera {
    cameraSpeed = 0.005;
    camera: BABYLON.ArcRotateCamera;

    constructor(scene: BABYLON.Scene, canvas: HTMLCanvasElement, width: number) {
        this.SetUpCamera(scene, canvas, width);
    }

    SetUpCamera(scene: BABYLON.Scene, canvas: HTMLCanvasElement, width: number) {
        let quarter = BABYLON.Tools.ToRadians(45)

        let camera = new BABYLON.ArcRotateCamera("camera1", quarter, quarter, width * 3, BABYLON.Vector3.Zero(), scene);
        
        // Target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        //test
        camera.keysUp.push(87);
        camera.keysDown.push(83);
        camera.keysLeft.push(65);
        camera.keysRight.push(68);

        // Attach the camera to the canvas
        camera.attachControl(canvas, false);
        this.camera = camera;
    }

    update() {
        this.camera.alpha += 1 * this.cameraSpeed;
    }
}
