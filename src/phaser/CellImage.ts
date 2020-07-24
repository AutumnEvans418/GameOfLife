export class CellImage {
    image: Phaser.GameObjects.Image;
    scene: Phaser.Scene;
    delay: number;
    setState(on: boolean) {
        if (on) {
            this.tween(Phaser.Math.FloatBetween(0.5, 1.5), 1, 'Sine.easeOut');
        }
        else {
            this.tween(0, 0, 'Sine.easeIn');
        }

    }
    tween(scale: number, opacity: number, ease: string) {
        this.scene.add.tween({
            targets: this.image,
            scale: scale,
            alpha: opacity,
            duration: this.delay,
            ease: ease
        });
    }
}
