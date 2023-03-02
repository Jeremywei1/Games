class LevelSelection extends Phaser.Scene {
    constructor() {
        super("LevelSel");
    }

    preload(){
        this.load.image('select', './assets/select.png');
        this.load.image('lvl1', './assets/lvl1.png');
        this.load.image('lvl2', './assets/lvl1.png');
        this.load.image('lvl3', './assets/lvl1.png');
        this.load.image('lvl4', './assets/lvl1.png');
        this.load.image('lvl5', './assets/lvl1.png');
        this.load.image('lvl6', './assets/lvl1.png');
        this.load.image('lvl7', './assets/lvl1.png');

        this.load.audio('playscenebackground', './assets/bgm.mp3');
    }

    create(){
        // define keys
        pointer = this.input.activePointer;

        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height*0.5, 'select');
        this.lvl1 = this.add.image(this.sys.game.config.width/4, this.sys.game.config.height*0.37, 'lvl1').setDepth(1);
        this.lvl2 = this.add.image(this.sys.game.config.width/2.5, this.sys.game.config.height*0.37, 'lvl2');
        this.lvl3 = this.add.image(this.sys.game.config.width*0.55, this.sys.game.config.height*0.37, 'lvl3');
        this.lvl4 = this.add.image(this.sys.game.config.width*0.7, this.sys.game.config.height*0.37, 'lvl4');
        this.lvl5 = this.add.image(this.sys.game.config.width*0.25, this.sys.game.config.height*0.675, 'lvl5');
        this.lvl6 = this.add.image(this.sys.game.config.width/2.5, this.sys.game.config.height*0.675, 'lvl6');
        this.lvl7 = this.add.image(this.sys.game.config.width*0.55, this.sys.game.config.height*0.675, 'lvl7');

        // set interactive
        this.lvl1.setInteractive();
        this.lvl2.setInteractive();
        this.lvl3.setInteractive();
        this.lvl4.setInteractive();
        this.lvl5.setInteractive();
        this.lvl6.setInteractive();
        this.lvl7.setInteractive();

        // do things while clicked lvl1
        this.lvl1.on('pointerdown', function() {
            this.scene.start('lvl1')
            // game bgm stop
            game.sound.stopAll();
        }, this);
        // do things while clicked lvl2
        this.lvl2.on('pointerdown', function() {
            this.scene.start('lvl2')
            // game bgm stop
            game.sound.stopAll();
            // background music
            this.bgm = this.sound.add('playscenebackground', {config});
            this.bgm.play();
            this.bgm.loop = true;
            this.bgm.volume = 0.6;
        }, this);
        // do things while clicked lvl3
        this.lvl3.on('pointerdown', function() {
            this.scene.start('lvl3')
            // game bgm stop
            game.sound.stopAll();
            // background music
            this.bgm = this.sound.add('playscenebackground', {config});
            this.bgm.play();
            this.bgm.loop = true;
            this.bgm.volume = 0.6;
        }, this);
        // do things while clicked lvl4
        this.lvl4.on('pointerdown', function() {
            this.scene.start('lvl4')
            // game bgm stop
            game.sound.stopAll();
            // background music
            this.bgm = this.sound.add('playscenebackground', {config});
            this.bgm.play();
            this.bgm.loop = true;
            this.bgm.volume = 0.6;
        }, this);
        // do things while clicked lvl5
        this.lvl5.on('pointerdown', function() {
            this.scene.start('lvl5')
            // game bgm stop
            game.sound.stopAll();
            // background music
            this.bgm = this.sound.add('playscenebackground', {config});
            this.bgm.play();
            this.bgm.loop = true;
            this.bgm.volume = 0.6;
        }, this);
        // do things while clicked lvl6
        this.lvl6.on('pointerdown', function() {
            this.scene.start('lvl6')
            // game bgm stop
            game.sound.stopAll();
            // background music
            this.bgm = this.sound.add('playscenebackground', {config});
            this.bgm.play();
            this.bgm.loop = true;
            this.bgm.volume = 0.6;
        }, this);
        // do things while clicked lvl7
        this.lvl7.on('pointerdown', function() {
            this.scene.start('lvl7')
            // game bgm stop
            game.sound.stopAll();
            // background music
            this.bgm = this.sound.add('playscenebackground', {config});
            this.bgm.play();
            this.bgm.loop = true;
            this.bgm.volume = 0.6;
        }, this);
    }
}

