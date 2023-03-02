class Level4 extends Phaser.Scene {
    constructor() {
        super("lvl4");
    }

    preload() {
        this.load.image('border_down', './assets/border_down.png');
        this.load.image('border_up', './assets/border_up.png');
        this.load.image('border_left', './assets/lvl4_sprites/borderLeft4.png');
        this.load.image('border_right', './assets/lvl4_sprites/borderRight4.png');
        this.load.image('candy', './assets/candy.png');
        this.load.image('ci_2', './assets/lvl4_sprites/ci_2.png');
        this.load.image('ci_3', './assets/lvl4_sprites/ci_3.png');
        this.load.image('plat', './assets/lvl1_terrain/ground_short.png');
        this.load.image('upPlain', './assets/lvl4_sprites/level4_upper.png');
        this.load.image('midPlain', './assets/lvl4_sprites/level4_middle.png');
        this.load.image('mid', './assets/lvl4_sprites/level4_middleUpper.png');
        this.load.image('bottom', './assets/lvl4_sprites/level4_bottomGround.png');
        this.load.image('gameover1', './assets/lvl4_sprites/gameover90.png');
        this.load.image('gamewin1', './assets/lvl4_sprites/gamewin90.png');
        this.load.image('die', './assets/die.png');
        this.load.image('pass', './assets/pass.png');
        this.load.spritesheet('girl', './assets/playerWalk.png', {frameWidth: 48, frameHeight: 98, startFrame: 0, endFrame: 0});
        this.load.spritesheet('walk', './assets/playerWalk.png', {frameWidth: 48, frameHeight: 98, startFrame: 0, endFrame: 4});

        // preload.music
        this.load.audio('jse', './assets/changeG.wav');
        this.load.audio('spiderSound', './assets/spiderG.wav');
        this.load.audio('pass', './assets/pass.wav');
        this.load.audio('death', './assets/death.wav');
    }

    create() {
        // variables and settings
        this.scale.setGameSize(720, 1280);
        this.sys.game.config.height = 1280;
        this.sys.game.config.width = 720;
        this.DRAG = 500;
        this.score = 0;
        this.gravityYnum = 2000;
        this.gravityXnum = 2000;
        this.anglenum = 0;
        this.collidecheck = false;
        this.playPassSound = 0;
        this.deathnum = 0;

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
        // game over flag
        this.gameOver = false;
        this.youDie = false;

        // define our objects
        // girl
        this.girl = this.physics.add.sprite(this.sys.game.config.width*0.15, this.sys.game.config.height*0.7, 'girl');
        this.girl.setGravityY(this.gravityYnum);
        //this.girl.setFlipX(true);

        // candy
        this.candy1 = this.physics.add.sprite(this.sys.game.config.width*0.83, this.sys.game.config.height*0.12, 'candy');
        this.candy1.setImmovable();

        // implement terrains
        // bottom
        this.bottom = this.physics.add.sprite(200, this.sys.game.config.height*0.9, 'bottom');
        this.bottom.setImmovable();
        this.physics.add.collider(this.girl, this.bottom);
        // upper*2
        this.up1 = this.physics.add.sprite(this.sys.game.config.width*0.7, this.sys.game.config.height*0.2, 'upPlain');
        this.up1.setImmovable();
        this.physics.add.collider(this.girl, this.up1);
        this.up2 = this.physics.add.sprite(this.sys.game.config.width*0.49, this.sys.game.config.height*0.268, 'mid');
        this.up2.angle += 180;
        this.up2.setImmovable();
        this.physics.add.collider(this.girl, this.up2);
        // middle*2
        this.mid1 = this.physics.add.sprite(this.sys.game.config.width*0.327, this.sys.game.config.height*0.6, 'midPlain');
        this.mid1.setImmovable();
        this.physics.add.collider(this.girl, this.mid1);
        this.mid2 = this.physics.add.sprite(this.sys.game.config.width*0.49, this.sys.game.config.height*0.536, 'mid');
        this.mid2.setImmovable();
        this.physics.add.collider(this.girl, this.mid2);

        // ci
        this.ciDown = this.physics.add.sprite(this.sys.game.config.width*0.775, this.sys.game.config.height*0.925, 'ci_3');
        this.ciMid = this.physics.add.sprite(this.sys.game.config.width*0.215, this.sys.game.config.height*0.536, 'ci_3');
        this.ciUpleft = this.physics.add.sprite(this.sys.game.config.width*0.72, this.sys.game.config.height*0.268, 'ci_2');
        this.ciUpright = this.physics.add.sprite(this.sys.game.config.width*0.87, this.sys.game.config.height*0.268, 'ci_2');
        this.ciUpleft.angle += 180;
        this.ciUpright.angle += 180;
        this.ciDown.setImmovable();
        this.ciMid.setImmovable();
        this.ciUpleft.setImmovable();
        this.ciUpright.setImmovable();

        // place the borders
        // down border
        this.borderdown = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height-36, 'border_down');
        this.borderdown.setImmovable();       
        // right border
        this.borderright = this.physics.add.sprite(this.sys.game.config.width-32, this.sys.game.config.height/2, 'border_right');
        this.borderright.displayHeight = this.sys.game.config.height;
        this.borderright.setImmovable();
        // up border
        this.borderup = this.physics.add.sprite(this.sys.game.config.width/2, 32, 'border_up');
        this.borderup.setImmovable();
        // left border
        this.borderleft = this.physics.add.sprite(32, this.sys.game.config.height/2, 'border_left');
        this.borderleft.displayHeight = this.sys.game.config.height;
        this.borderleft.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.borderup);
        this.physics.add.collider(this.girl, this.borderdown);
        this.physics.add.collider(this.girl, this.borderleft);
        this.physics.add.collider(this.girl, this.borderright);

        // score display
        this.playerScore = 0;
        let scoreConfigconfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '40px',
            color: '#FFFFFF',
            align: 'middle',
            padding: {
                top: 35,
                bottom: 25,
            },
            fixedWidth: 150
        }
        this.scoreS = this.add.text(70, 25, this.score, scoreConfigconfig);
        scoreConfigconfig.fontSize = '20px';
        scoreConfigconfig.fixedWidth = 300;
        this.restart = this.add.text(120, 40, '[R] to restart lvl3', scoreConfigconfig);

        // game over image
        this.gameoverImage = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'gameover1');
        this.gameoverImage.alpha = 0;
        // gamewin image
        this.gamewinImage = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'gamewin1');
        this.gamewinImage.alpha = 0;

        // animations
        // walk animation
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 4, first: 4}),
            frameRate: 5,
            repeat: -1
        });
    }

    update() {
        // switch once until the girl collide with something
        this.checkswitch();

        // check angle within 360 degrees
        if(this.anglenum >= 360) this.anglenum -= 360;

        // walking animation
        if( !(keyLEFT.isDown || keyRIGHT.isDown || keyUP.isDown || keyDOWN.isDown) ) this.girl.anims.play('walking');

        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyN)) {
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("lvl5");
            });
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            game.sound.stopAll();
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("menuScene");
            });
        }
        if (this.youDie && Phaser.Input.Keyboard.JustDown(keyR)){
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.restart();
            });
        }else if(this.youDie && Phaser.Input.Keyboard.JustDown(keyM)){
            game.sound.stopAll();
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("menuScene");
            });
        }

        // game over settings
        let overConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            color: '#FFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 600
        }
        if( this.score == 1 ){
            this.gameOver = true;
            this.physics.pause();
            this.input.keyboard.removeKey('S');
            this.input.keyboard.removeKey('UP');
            this.input.keyboard.removeKey('DOWN');
            this.input.keyboard.removeKey('LEFT');
            this.input.keyboard.removeKey('RIGHT');
            this.gamewinImage.alpha += .01;
            if(this.gamewinImage.alpha == 1){
                overConfig.color = '#000';
                this.add.image(game.config.width/2, game.config.height/3.5, 'pass');
            }
        }
        // game sound play
        if( this.playPassSound == 5){
            this.sound.play('pass');
            this.sound.volume = 0.2;
        }
        if( this.youDie && this.deathnum == 0) {
            this.deathnum += 1;
            this.sound.play('death');
            this.sound.volume = 0.1;
        }
        if( this.youDie ){
            this.physics.pause();
            this.input.keyboard.removeKey('S');
            this.input.keyboard.removeKey('UP');
            this.input.keyboard.removeKey('DOWN');
            this.input.keyboard.removeKey('LEFT');
            this.input.keyboard.removeKey('RIGHT');
            this.gameoverImage.alpha += .01;
            if(this.gameoverImage.alpha == 1){
                overConfig.color = '#000';
                this.add.text(game.config.width/2, game.config.height/2+260, 'You Died!', overConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2+300, 'Press [R] to replay or [M] for Menu.', overConfig).setOrigin(0.5);
            }
        }

        // move methods 
        if(this.anglenum == 0){ // down border
            if( keyLEFT.isDown ){
                this.girl.body.setVelocityX(-200);
                this.girl.setFlipX(true);
            }else if ( keyRIGHT.isDown ){
                this.girl.body.setVelocityX(200);
                this.girl.setFlipX(false);
            }else {
                this.girl.body.setDragX(this.DRAG);
            }
        }else if(this.anglenum == 180){ // up border
            if( keyLEFT.isDown ){
                this.girl.body.setVelocityX(-200);
                this.girl.setFlipX(false);
            }else if ( keyRIGHT.isDown ){
                this.girl.body.setVelocityX(200);
                this.girl.setFlipX(true);
            }else {
                this.girl.body.setDragX(this.DRAG);
            }
        }else if(this.anglenum == 90){ // left border
            if( keyUP.isDown ){
                this.girl.body.setVelocityY(-200);
                this.girl.setFlipX(true);
            }else if ( keyDOWN.isDown ){
                this.girl.body.setVelocityY(200);
                this.girl.setFlipX(false);
            }else {
                this.girl.body.setDragY(this.DRAG);
            }
        }else if(this.anglenum == 270){ // right border
            if( keyUP.isDown ){
                this.girl.body.setVelocityY(-200);
                this.girl.setFlipX(false);
            }else if ( keyDOWN.isDown ){
                this.girl.body.setVelocityY(200);
                this.girl.setFlipX(true);
            }else {
                this.girl.body.setDragY(this.DRAG);
            }
        }
        
        // gravity-change method
        if(  !this.collidecheck && Phaser.Input.Keyboard.JustDown(keyS) ){
            this.collidecheck = true;
            this.changeGravity();
            this.sound.play('jse');
            this.sound.volume = 0.4;
        }

        if (this.physics.world.overlap(this.girl, this.ciDown) || this.physics.world.overlap(this.girl, this.ciMid) || this.physics.world.overlap(this.girl, this.ciUpleft) || this.physics.world.overlap(this.girl, this.ciUpright))
            this.youDie = true;

        // candy collect method
        if(this.physics.world.overlap(this.girl, this.candy1)){
            this.sound.play('pass');
            this.playPassSound += 1;
            this.candycollect(this.candy1);
        }

        // transfer while collide with flowers
        if(this.physics.world.overlap(this.girl, this.flower1)){
            this.transfer(this.flower1,this.flower2);
        }
    }

    changeGravity() {
        this.anglenum += 180;
        this.girl.angle = this.anglenum;
        if(this.anglenum >= 360){
            this.anglenum -= 360;
        }
        if(this.anglenum == 0){
            this.girl.setGravityX(0);
            this.girl.setGravityY(this.gravityYnum);
        }else if(this.anglenum == 180){
            this.girl.setGravityX(0);
            this.girl.setGravityY(-this.gravityYnum);
        }else if(this.anglenum == 90){
            this.girl.setGravityY(0);
            this.girl.setGravityX(-this.gravityXnum);
        }else if(this.anglenum == 270){
            this.girl.setGravityY(0);
            this.girl.setGravityX(this.gravityXnum);
        }
    }

    candycollect(candy){
        candy.destroy();
        this.score += 1;
        this.scoreS.text = this.score;
    }

    checkswitch(){
        if(this.anglenum == 0 && this.girl.body.touching.down){
            this.collidecheck = false;
        }else if(this.anglenum == 180 && this.girl.body.touching.up){
            this.collidecheck = false;
        }else if(this.anglenum == 90 && this.girl.body.touching.left){
            this.collidecheck = false;
        }else if(this.anglenum == 270 && this.girl.body.touching.right){
            this.collidecheck = false;
        }
    }
}