# Conway's Game of Life

This is a collection of implementations of Conway's game of life that are playable in the browser.  These implementations include:
- [Babylonjs (3D)](#babylonjs)
- [Phaserjs (2D)](#phaser)
- [HTML Canvas API (2D)](#canvas)

## Babylonjs
Below are visualizations of Conway's game of life in 3D space using Babylonjs.

![](/assets/Screenshot_2.jpg)

The algorithm used is as follows:
- If a cell is dead with 4 alive neighbors, it becomes alive
- If a cell is alive with 5-6 alive neighbors, it stays alive
- If neither of the above are true, the cell becomes/stays dead

### Oscillators
An oscillator in the game of life is a group of cells that repeat the same pattern over x number of generations.  Below are the ones I have found.
#### The Stairs
![](/assets/stair.gif)
#### The Tube
![](/assets/tube.gif)
#### The Cube
![](/assets/cube.gif)

#### Random Examples
Below are some examples with more complex behavior.
![](assets/close.gif)

By changing the algorithm parameters, you can get less chaotic results.  The examples below have more space and flat surfaces.  You can see that I used a Minecraft-like texture to illustrate how one could use this to generate terrain.

![](/assets/cellatomata5.gif)
![](/assets/cellatomata4.gif)

## Phaser
Below is an example of Conway's game of life using Phaserjs.  The cell structure shown below is called the glider gun, as it creates more cells that move to the bottom right.

![](/assets/cellatomata3.gif)

## Canvas

Below is the game of life created with the HTML canvas api.  You can see oscillators in the middle and the glider gun in the top left.

![](assets/cellatomata2.gif)
![](assets/cellatomata.gif)