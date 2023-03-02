class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images / title sprite
        // preload.image('fileName', 'location')
        this.load.image('ground', './assets/ground.png');
        this.load.image('background', './assets/background.png');
        this.load.image('ice', './assets/ice.png');
        this.load.spritesheet('jump', './assets/jump1.png', {frameWidth: 80, frameHeight: 47, startFrame: 0, endFrame: 0});
        this.load.image('snow_1', './assets/snow_1.png');
        this.load.image('snow_2', './assets/snow_2.png');
        this.load.image('snow_3', './assets/snow_3.png');
        this.load.spritesheet('seal', './assets/slide.png', {frameWidth: 80, frameHeight: 47, startFrame: 0, endFrame: 9});

        // preload.music
        this.load.audio('playscenebackground', './assets/07 Funny Companion().mp3');
        this.load.audio('jse', './assets/jumpsoundeffect.mp3');
    }

    create() {
        // count 
        this.count = 1;

        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        this.snow_2 = this.add.tileSprite(0, 0, 640, 480, 'snow_2').setOrigin(0, 0);
        this.snow_3 = this.add.tileSprite(0, 0, 640, 480, 'snow_3').setOrigin(0, 0);

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    
        // background music
        this.bgm = this.sound.add('playscenebackground', {config});
        this.bgm.play();
        this.bgm.loop = true;
        this.bgm.volume = 0.4;
    
        // game over flag
        this.gameOver = false;

        // background speed
        this.speed = 1;
        // add ice 
        this.iceSpeed = -60;
        this.iceCount = 1;
        this.ice01 = this.physics.add.sprite(game.config.width+10, 357, 'ice');
        this.ice02 = this.physics.add.sprite(game.config.width+200, 357, 'ice');

        // define our objects
        this.seal = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.75, 'seal');
        this.snow_1 = this.add.tileSprite(0, 0, 640, 480, 'snow_1').setOrigin(0, 0);
        //set the gravity
        this.seal.setGravityY(1000);
        // place the ground
        this.ground = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*1.3, 'ground');
        // size the ground
        this.ground.displayWidth = this.sys.game.config.width * 1.1;
        // make the ground stay in place
        this.ground.setImmovable();
        
        // add the colliders
        this.physics.add.collider(this.ice01, this.ground);
        this.physics.add.collider(this.ice02, this.ground);
        this.physics.add.collider(this.seal, this.ground);
        this.physics.add.collider(this.seal, this.ice01);
        this.physics.add.collider(this.seal, this.ice02);

        // jump method
        this.jumpTime = 1;

        // animations
        // walk animation
        this.anims.create({
            key: 'walking',
            frames: 'seal',
            frameRate: 10,
            repeat: -1
        });
        // jump animation
        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 0, first: 0}),
            frameRate:30,
            repeat: -1
        });

        // score display
        this.playerScore = 0;
        let scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '30px',
            color: '#17306A',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }
        this.scoreLeft = this.add.text(69, 45, this.playerScore, scoreConfig);
        this.arrowUp = this.add.text(this.sys.game.config.width / 4, 290, '↑', scoreConfig);
    }

    jump() {
        this.seal.setVelocityY(-400);
        this.seal.anims.play('jumping');
        this.jumpTime++;
    }

    walk(){
        this.seal.anims.play('walking', true);
    }

    

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // score
        if ( !this.gameOver){
            this.playerScore = Phaser.Math.CeilTo(this.speed*10-10.5);
        }

        // ice status
        this.ice01.setVelocityX(this.iceSpeed);
        this.ice02.setVelocityX(this.iceSpeed);
        this.iceCount += 1;

        let overConfig = {
            fontFamily: 'Bradley Hand',
            fontSize: '25px',
            color: '#3E5CA3',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }

        if( this.seal.body.touching.right ){
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2 - 32, 'GAME OVER', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press [↑] to Restart or [←] for Menu', overConfig).setOrigin(0.5);
            this.bgm.stop();
        }

        // jump methods
        if( this.jumpTime<1 && Phaser.Input.Keyboard.JustDown(keyUP) ){
            this.arrowUp.destroy();
            this.jump();
            this.sound.play('jse');
            this.sound.volume = 0.4;
        }
        if( this.seal.body.touching.down ){
            this.jumpTime = 0;
            this.walk();
        }else if(this.jumpTime < 1){
            this.seal.anims.play('jumping',true);
        }

        // speed up method
        this.count += 1;
        if( this.count%17==1 ) {
            this.speed *= 1.01;
            this.iceSpeed *= 1.01;
        }

        // background movements
        this.background.tilePositionX += this.speed;
        this.snow_1.tilePositionY += -5;
        this.snow_2.tilePositionY += -2.5;
        this.snow_3.tilePositionY += -1;
        this.snow_1.tilePositionX += 1;
        this.snow_2.tilePositionX += 1;
        this.snow_3.tilePositionX += 1;

        // wrap physics object(s) .wrap(gameObject, padding)
        this.physics.world.wrap(this.ice01, Phaser.Math.Between(10, 200));
        this.physics.world.wrap(this.ice02, Phaser.Math.Between(200, 360));

        // display score
        this.scoreLeft.text = this.playerScore + 'Meters';
    }
}