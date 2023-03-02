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
    }

    create(){
        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height*0.5, 'select');
        this.add.image(this.sys.game.config.width/4, this.sys.game.config.height*0.37, 'lvl1');
        this.add.image(this.sys.game.config.width/2.5, this.sys.game.config.height*0.37, 'lvl2');
        this.add.image(this.sys.game.config.width*0.55, this.sys.game.config.height*0.37, 'lvl3');
        this.add.image(this.sys.game.config.width*0.7, this.sys.game.config.height*0.37, 'lvl4');
        this.add.image(this.sys.game.config.width*0.25, this.sys.game.config.height*0.675, 'lvl5');
        this.add.image(this.sys.game.config.width*2, this.sys.game.config.height*0.5, 'lvl6');
        this.add.image(this.sys.game.config.width*2, this.sys.game.config.height*0.5, 'lvl7');
    }
}
