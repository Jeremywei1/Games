class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio and image
        this.load.image('gamestart', './assets/menu.png');
        this.load.audio('menuscenebackground', './assets/creepyM.mp3');
    }

    create() {
        this.scale.setGameSize(1280,720);
        this.sys.game.config.height = 720;
        this.sys.game.config.width = 1280;

        // menu scene background music
        this.bgm = this.sound.add('menuscenebackground', {config});
        this.bgm.play();
        this.bgm.loop = true;
        this.bgm.volume = 0.6;

        // menu image
        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'gamestart');

        // define keys
        pointer = this.input.activePointer;
    }

    update() {
        if (pointer.isDown) {
            this.scene.start("LevelSel");    
        }
    }   
}