class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images / title sprite
        // preload.image('fileName', 'location')
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('SuperSS', './assets/SuperSS.png');
        this.load.image('timeship', './assets/timeship.png');
        //this.load.image('nanthan', './assets/nanthan.png');
        // preload.music
        this.load.audio('background', './assets/background.wav');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);

        // green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);
        
        // add rocket (p1)
        // constructor(scene, x, y, texture, frame);
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);
    
        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width+142, 132, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width+300, 180, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 230, 'spaceship', 0, 10).setOrigin(0, 0);

        // add SuperSpaceShip
        this.Sship = new SuperSS(this, game.config.width+250, 130, 'SuperSS', 0, 60).setOrigin(0, 0);

        // add Timeship
        this.tship = new Timeship(this, game.config.width+290, 130, 'timeship', 0, 10).setOrigin(0, 0);

        // define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        // background music
        this.bgm = this.sound.add('background', {config});
        this.bgm.play();
    
        // game over flag
        this.gameOver = false;
        
        this.timer = game.settings.gameTimer;
         
        // 60-second play clock
        //this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        //    this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        //    this.gameOver = true;
        //    this.bgm.stop();
        //}, null, this);
    }

    

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.timer -= 16.91;
        if(this.timer <= 0) {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.p1Score).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', this.p1Score).setOrigin(0.5);
            this.gameOver = true;
            this.bgm.stop();
        }

        // scroll starfields
        //this.starfield.tilePositionX -= 4;  // scroll tile sprite
        // how to do diagnal movement?
        this.starfield.tilePositionX -= 2;

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        // check SuperSpaceShip collision here
        if (this.checkCollision(this.p1Rocket, this.Sship)) {
            this.p1Rocket.reset();
            this.shipExplode(this.Sship);
        }

        // check Timeship collision here
        if (this.checkCollision(this.p1Rocket, this.tship)) {
            this.p1Rocket.reset();
            this.timer += game.settings.addTime;              // add seconds when hit
            this.shipExplode(this.tship);
        }

        if (!this.gameOver) {          
            //this.nanthan.update();     
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.Sship.update();           // update SuperSpaceShip here 
            this.tship.update();
        } 
    }

    checkCollision(rocket, ship){
        // AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.width &&
            rocket.height + rocket.y > ship.y){
                return true;
        }else{
                return false; 
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });       
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        // sound effects 
        this.sound.play('sfx_explosion'); 
    }
}