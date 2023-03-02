class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        // load images / title sprite
        // preload.image('fileName', 'location')
        this.load.image('border_down', './assets/border_down.png');
        this.load.image('real_border_down', './assets/realBorderdown.png');
        this.load.image('border_up', './assets/border_up.png');
        this.load.image('border_left', './assets/border_left.png');
        this.load.image('border_right', './assets/border_right.png');
        this.load.image('candy', './assets/candy.png');
        this.load.image('spider', './assets/spider.png');
        this.load.image('ground_short', './assets/lvl1_terrain/ground_short.png');
        this.load.image('level1_bottomGround', './assets/lvl1_terrain/level1_bottomGround.png');
        this.load.image('level1_upperGround', './assets/lvl1_terrain/level1_upperGround.png');
        this.load.spritesheet('girl', './assets/player.png', {frameWidth: 73, frameHeight: 155, startFrame: 0, endFrame: 9});

        // preload.music
        this.load.audio('playscenebackground', './assets/bgm.mp3');
        this.load.audio('jse', './assets/jumpsoundeffect.mp3');
    }
}