import 'phaser'
import { MainScene } from './MainScene';
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'parent',
        width: '100%',
        height: '100%'
    },
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         gravity: { y: 200 }
    //     }
    // },
    scene: [MainScene]
};

var game = new Phaser.Game(config);


