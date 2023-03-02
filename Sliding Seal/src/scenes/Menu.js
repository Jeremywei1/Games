class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('menuscenebackground', './assets/background2.wav');
        this.load.audio('start', './assets/jiao.wav');
    }

    create() {
        this.bgm = this.sound.add('menuscenebackground', {config});
        this.bgm.play();
        this.bgm.loop = true;
        this.bgm.volume = 0.4;
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

        this.add.text(centerX, centerY-textSpacer, 'Sliding Seal', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '30px';
        this.add.text(centerX, centerY, 'Use [↑] to jump & avoid the ice cubes!', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY+textSpacer, 'Press [←] for to start', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.sound.volume = 0.4;
        this.sound.play('start');
        this.scene.start("playScene");    
        this.bgm.stop();
        }
    }   
}