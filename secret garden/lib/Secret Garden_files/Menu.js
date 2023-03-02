class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio and image
        this.load.image('gamestart', './assets/gamestart.png');
        this.load.audio('menuscenebackground', './assets/background2.wav');
        this.load.audio('start', './assets/jiao.wav');
    }

    create() {
        this.scale.setGameSize(1280,720);
        this.sys.game.config.height = 720;
        this.sys.game.config.width = 1280;

        // menu scene background music
        this.bgm = this.sound.add('menuscenebackground', {config});
        this.bgm.play();
        this.bgm.loop = true;
        this.bgm.volume = 0.4;

        // menu image
        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'gamestart');

        // menu display
        let menuConfig = {
            fontFamily: 'Bradley Hand',
            fontSize: '40px',
            color: '#90C1F6',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // display menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX/2, centerY, 'Secret Garden', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '25px';
        this.add.text(centerX*3/2, centerY-textSpacer, 'Use [←]or[→]or[↑]or[↓] to move.', menuConfig).setOrigin(0.5);
        this.add.text(centerX*3/2, centerY, 'Press [S] to reverse gravity.', menuConfig).setOrigin(0.5);
        menuConfig.color = '#69FCF3';
        menuConfig.fontSize = '30px';
        this.add.text(centerX*3/2, centerY+textSpacer, 'Touch spider to rotate 90 degrees.', menuConfig).setOrigin(0.5);
        this.add.text(centerX*3/2, centerY+2*textSpacer, 'Touch flower to transfer.', menuConfig).setOrigin(0.5);
        this.add.text(centerX*3/2, centerY+3*textSpacer, 'Collect all the candies', menuConfig).setOrigin(0.5);
        this.add.text(centerX*3/2, centerY+4*textSpacer, 'Or touch the door to pass the level!', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF';
        menuConfig.color = '#000';
        this.add.text(centerX/2, centerY+textSpacer, 'Click to start', menuConfig).setOrigin(0.5);

        // define keys
        pointer = this.input.activePointer;
    }

    update() {
        if (pointer.isDown) {
            this.sound.volume = 0.4;
            this.sound.play('start');
            this.scene.start("LevelSel");    
            this.bgm.stop();
        }
    }   
}