import {max, settings, createGrid, nextGen, setExample, ICell, } from '../life2d'
import { gameExamples } from '../2d/examples'

export class MainScene extends Phaser.Scene {
    constructor() {
        super('main');
    }
    preload() {
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('red', 'assets/particles/red.png');

    }
    grid: ICell[][]
    size = 50
    imgScale = 0.5
    images: Phaser.GameObjects.Image[][] = []
    create() {
        console.log('starting')
        settings.size = 10;
        this.grid = createGrid();
        setExample(this.grid, 'glider');
        settings.hasBoundary = false;
        let padding = 50;
        this.add.image(400, 300, 'sky');
        for(let i = 0;i < this.grid.length;i++){
            let imagesRow: Phaser.GameObjects.Image[] = []
            for(let j = 0;j< this.grid[i].length;j++){
                let current = this.grid[i][j];

                let img = this.add.image(padding + i*this.size,padding + j*this.size,'red').setScale(this.imgScale)
                if(current.value == 1){
                    imagesRow.push(img.setTint(0xff0000));
                }
                else{
                    imagesRow.push(img.setTint(0x0000ff));
                }
            }

            this.images.push(imagesRow);
        }
        //this.cameras.main.setZoom(0.5)
        this.time.addEvent({repeat: -1, delay: 100, callbackScope: this, callback: () => {
            nextGen(this.grid)
            this.updateGrid()
        }})
    }

    updateGrid(){
        for(let i = 0;i < this.grid.length;i++){
            for(let j = 0;j< this.grid[i].length;j++){
                let current = this.grid[i][j];

                let currentImg = this.images[i][j];

                
                if(current.value == 1){
                    currentImg.setTint(0xff0000)
                    // if(!currentImg){
                    //     this.images[i][j] = this.add.image(i*this.size,j*this.size,'red').setScale(this.imgScale)
                    // }
                    //imagesRow.push();
                }
                else{
                    currentImg.setTint(0x0000ff)
                    // if(currentImg){
                    //     currentImg.destroy()
                    // }
                }
            }
        }
    }
}
