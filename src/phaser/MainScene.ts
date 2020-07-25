import { createGrid, nextGen, setExample, } from '../life2d'
import { gameExamples } from '../2d/examples'
import { Tilemaps } from 'phaser';
import { CellImage } from './CellImage';
import { ICell, settings, IGrid, IGridCell } from '../life';

export class MainScene extends Phaser.Scene {
    constructor() {
        super('main');
    }
    preload() {
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('red', 'assets/particles/red.png');

    }
    grid: IGridCell
    size = 25
    imgScale = 0
    onImgScale = 0.8;
    images: IGrid<CellImage>
    updateTime = 100;
    onClr = 0xff0000;
    offClr = 0x0000ff;
    create() {
        console.log('starting')
        settings.size = 40;
        this.grid = createGrid();
        setExample(this.grid, 'Glider Gun');
        settings.hasBoundary = true;
        let padding = 50;
        // this.add.image(0, 0, 'sky')
        //     .setOrigin(0,0)
        //     .setSize(this.scale.width, this.scale.height);

        this.images = this.grid.convert(current => {
            let img = this.add.image(padding + current.x * this.size, padding + current.y * this.size, 'red').setScale(this.imgScale)

            let cell = new CellImage()
            cell.image = img;
            cell.scene = this;
            cell.delay = this.updateTime

            if (current.value == 1) {
                cell.setState(true);
            }
            else {
                cell.setState(false);
            }
            return cell;
        })

        this.time.addEvent({
            repeat: -1, delay: this.updateTime, callbackScope: this, callback: () => {
                nextGen(this.grid)
                this.updateGrid()
            }
        })
    }

    updateGrid() {

        this.grid.loop(current => {
            let currentImg = this.images.get(current.x, current.y, 0);
            if (current.previousValue != current.value) {

                if (current.value == 1) {
                    currentImg.setState(true)
                }
                else {
                    currentImg.setState(false)
                }
            }

        })
    }
}
