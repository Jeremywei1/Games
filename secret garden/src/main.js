// Date:          2020/05/16
// Group member:  Jia Wei, Rui Chen, Sunny Yan, Zihao Liu
// Game Name:     Secret Garden

// game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ Menu, LevelSelection, Level1, Level2, Level3, Level4, Level5, Level6, Level7 ]
}

// main game object
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyW, keyA, keyS, keyD, keyM, keyN, keyR, keyJ;
let pointer;