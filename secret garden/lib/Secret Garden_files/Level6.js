class Level6 extends Phaser.Scene {
    constructor() {
        super("lvl6");
    }

    preload() {
        this.load.image('border_down', './assets/border_down.png');
        this.load.image('real_border_down', './assets/realBorderdown.png');
        this.load.image('border_up', './assets/border_up.png');
        this.load.image('border_left', './assets/border_left.png');
        this.load.image('border_right', './assets/border_right.png');
        this.load.image('xian', './assets/lvl2_sprites/xian.png');
        this.load.image('spider', './assets/spider.png');
        this.load.image('ci_2', './assets/lvl4_sprites/ci_2.png');
        this.load.image('ci_3', './assets/lvl4_sprites/ci_3.png');
        this.load.image('ci_3_ver', './assets/lvl5_terrain/ci_390.png');
        this.load.image('sPlain', './assets/lvl4_sprites/level4_middle.png');
        this.load.image('lPlain', './assets/lvl4_sprites/level4_upper.png');
        this.load.image('sGrass', './assets/lvl4_sprites/level4_middleUpper.png');
        this.load.image('lGrass', './assets/lvl4_sprites/level4_bottomGround.png');
        this.load.image('taizi', './assets/lvl6_sprites/taizi.png');
        this.load.image('door', './assets/lvl2_sprites/door.png');
        this.load.image('doorOpen', './assets/door_opened.png');
        this.load.image('flower', './assets/lvl6_sprites/flower_pink.png');
        this.load.image('flower90', './assets/lvl6_sprites/flower_pinkLeft.png');
        this.load.image('dundun', './assets/lvl6_sprites/level6_middle.png');
        this.load.image('gameover', './assets/game over.png');
        this.load.image('gamewin', './assets/gamewin.png');
        this.load.image('die', './assets/die.png');
        this.load.image('pass', './assets/pass.png');
        this.load.image('flowerInstr', './assets/flower2.png');
        this.load.spritesheet('girl', './assets/playerWalk.png', {frameWidth: 48, frameHeight: 98, startFrame: 0, endFrame: 0});
        this.load.spritesheet('walk', './assets/playerWalk.png', {frameWidth: 48, frameHeight: 98, startFrame: 0, endFrame: 4});

        // preload.music
        this.load.audio('jse', './assets/changeG.wav');
        this.load.audio('spiderSound', './assets/spiderG.wav');
        this.load.audio('pass', './assets/pass.wav');
        this.load.audio('flowerSound', './assets/flowerSound.wav');
        this.load.audio('death', './assets/death.wav');
    }

    create() {
        // variables and settings
        this.scale.setGameSize(1280,720);
        this.sys.game.config.height = 720;
        this.sys.game.config.width = 1280;
        this.DRAG = 500;
        this.score = 0;
        this.gravityYnum = 2000;
        this.gravityXnum = 2000;
        this.anglenum = 0;
        this.collidecheck = false;
        this.finishDelay = 0;
        this.playPassSound = 1;
        this.deathnum = 0;

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
        // game over flag
        this.gameOver = false;
        this.youDie = false;

        // taizi
        this.taizi = this.physics.add.sprite(this.sys.game.config.width*0.5, this.sys.game.config.height*0.9, 'taizi');
        this.taizi.setImmovable();

        // door
        this.door = this.physics.add.sprite(this.sys.game.config.width*0.5, this.sys.game.config.height*0.88, 'door');
        this.door.setImmovable();
        this.door.scale = 0.8;
        this.doorOpen = this.physics.add.sprite(this.sys.game.config.width*0.497, this.sys.game.config.height*0.88, 'doorOpen');
        this.doorOpen.setVisible(false);
        this.doorOpen.setImmovable();
        this.doorOpen.scale = 0.8;

        // define our objects
        // flowers
        this.flower1 = this.physics.add.sprite(this.sys.game.config.width*0.07, this.sys.game.config.height*0.4, 'flower90');
        this.flower2 = this.physics.add.sprite(this.sys.game.config.width*0.78, this.sys.game.config.height*0.87, 'flower');
        this.flower1.scale = 0.7;
        this.flower2.scale = 0.7;
        this.flower1.setImmovable();
        this.flower2.setImmovable();

        // instruction
        this.ins1 = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height*0.5, 'flowerInstr');
        
        // girl
        this.girl = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.7, 'girl');
        this.girl.setCollideWorldBounds(true);
        this.girl.setGravityY(this.gravityYnum);
        this.girl.setFlipX(true);

        // xian
        this.xian_1 = this.physics.add.sprite(this.sys.game.config.width*0.23, this.sys.game.config.height*0.1, 'xian');
        this.xian_1.setImmovable();
        this.xian_2 = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.23, 'xian');
        this.xian_2.setImmovable();
        this.xian_3 = this.physics.add.sprite(this.sys.game.config.width*0.77, this.sys.game.config.height*0.1, 'xian');
        this.xian_3.setImmovable();
        
        // spider
        this.spider_1 = this.physics.add.sprite(this.sys.game.config.width*0.23, this.sys.game.config.height*0.27, 'spider');
        this.spider_1.setImmovable();
        this.spider_1.angle+=180;
        this.spider_2 = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.41, 'spider');
        this.spider_2.setImmovable();
        this.spider_2.angle+=180;
        this.spider_3 = this.physics.add.sprite(this.sys.game.config.width*0.77, this.sys.game.config.height*0.27, 'spider');
        this.spider_3.setImmovable();
        this.spider_3.angle+=180;

        // ci_up
        this.ci_up1 = this.physics.add.sprite(this.sys.game.config.width*0.455, this.sys.game.config.height*0.09, 'ci_2');
        this.ci_up2 = this.physics.add.sprite(this.sys.game.config.width*0.545, this.sys.game.config.height*0.09, 'ci_2');
        this.ci_up1.angle += 180;
        this.ci_up2.angle += 180;
        this.ci_up1.setImmovable();
        this.ci_up2.setImmovable();
        // ci_down
        this.ci_down1 = this.physics.add.sprite(this.sys.game.config.width*0.36, this.sys.game.config.height*0.6, 'ci_3');
        this.ci_down2 = this.physics.add.sprite(this.sys.game.config.width*0.64, this.sys.game.config.height*0.6, 'ci_3');
        this.ci_down1.setImmovable();
        this.ci_down2.setImmovable();
        // ci_left
        this.ci_left = this.physics.add.sprite(this.sys.game.config.width*0.91, this.sys.game.config.height*0.46, 'ci_3_ver');
        this.ci_left.displayHeight = this.ci_left.height * 1.1;
        this.ci_left.displayWidth = this.ci_left.width * 1.5;
        this.ci_left.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.ci_up1);
        this.physics.add.collider(this.girl, this.ci_up2);
        this.physics.add.collider(this.girl, this.ci_down1);
        this.physics.add.collider(this.girl, this.ci_down2);
        this.physics.add.collider(this.girl, this.ci_left);

        // platforms
        // up terrains
        this.upPlain_1 = this.physics.add.sprite(this.sys.game.config.width*0.18, this.sys.game.config.height*0.1, 'sPlain');
        this.upPlain_2 = this.physics.add.sprite(this.sys.game.config.width*0.82, this.sys.game.config.height*0.1, 'sPlain');
        this.terrain1 = this.physics.add.sprite(this.sys.game.config.width*0.08, this.sys.game.config.height*0.2, 'sGrass');
        this.terrain1.displayHeight = this.terrain1.height*1.8;
        this.terrain2 = this.physics.add.sprite(this.sys.game.config.width*0.93, this.sys.game.config.height*0.2, 'sGrass');
        this.terrain2.displayHeight = this.terrain2.height*1.8;
        this.terrain1.angle += 180;
        this.terrain2.angle += 180;
        // down terrains
        this.terrain5 = this.physics.add.sprite(this.sys.game.config.width*0-50, this.sys.game.config.height*0.8, 'lGrass');
        this.terrain6 = this.physics.add.sprite(this.sys.game.config.width*1+50, this.sys.game.config.height*0.8, 'lGrass');
        this.terrain6.setFlipX(true);
        // longer plat
        this.terrain1.displayWidth *= 1.24;
        this.terrain2.displayWidth *= 1.24;
        this.upPlain_1.displayWidth *= 1;
        this.upPlain_2.displayWidth *= 1;
        this.terrain5.displayWidth *= 1;
        this.terrain6.displayWidth *= 1;
        // dundun
        this.dundun1 = this.physics.add.sprite(this.sys.game.config.width*0.36, this.sys.game.config.height*0.9, 'dundun');
        this.dundun2 = this.physics.add.sprite(this.sys.game.config.width*0.64, this.sys.game.config.height*0.9, 'dundun');
        this.dundun1.displayHeight *= 1.59;
        this.dundun2.displayHeight *= 1.59;
        // setImmovable
        this.terrain1.setImmovable();
        this.terrain2.setImmovable();
        this.upPlain_1.setImmovable();
        this.upPlain_2.setImmovable();
        this.terrain5.setImmovable();
        this.terrain6.setImmovable();
        this.dundun1.setImmovable();
        this.dundun2.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.terrain1);
        this.physics.add.collider(this.girl, this.terrain2);
        this.physics.add.collider(this.girl, this.upPlain_1);
        this.physics.add.collider(this.girl, this.upPlain_2);
        this.physics.add.collider(this.girl, this.terrain5);
        this.physics.add.collider(this.girl, this.terrain6);
        this.physics.add.collider(this.girl, this.dundun1);
        this.physics.add.collider(this.girl, this.dundun2);

        // place the borders
        // down border
        this.realB = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.95, 'real_border_down');
        this.borderdown = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height-36, 'border_down');
        this.borderdown.displayWidth = this.sys.game.config.width * 1.1;
        this.borderdown.displayHeight = this.borderdown.height * 1.5;
        this.realB.setImmovable();        
        // right border
        this.borderright = this.physics.add.sprite(this.sys.game.config.width-20, this.sys.game.config.height/2, 'border_right');
        this.borderright.displayHeight = this.sys.game.config.height * 1.1;
        this.borderright.setImmovable();
        // up border
        this.realBup = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.05, 'real_border_down');
        this.borderup = this.physics.add.sprite(this.sys.game.config.width/2, 36, 'border_up');
        this.borderup.displayWidth = this.sys.game.config.width * 1.1;
        this.borderup.displayHeight = this.borderup.height * 1.5;
        this.realBup.setImmovable();
        // left border
        this.borderleft = this.physics.add.sprite(20, this.sys.game.config.height/2, 'border_left');
        this.borderleft.displayHeight = this.sys.game.config.height * 1.1;
        this.borderleft.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.realBup);
        this.physics.add.collider(this.girl, this.realB);
        this.physics.add.collider(this.girl, this.borderleft);
        this.physics.add.collider(this.girl, this.borderright);

        // score display
        this.playerScore = 0;
        let scoreConfig = {
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
        this.scoreS = this.add.text(70, 25, this.score, scoreConfig);
        scoreConfig.fontSize = '20px';
        scoreConfig.fixedWidth = 300;
        this.restart = this.add.text(120, 40, '[R] to restart lvl6', scoreConfig);

        // game over image
        this.gameoverImage = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'gameover');
        this.gameoverImage.alpha = 0;
        // gamewin image
        this.gamewinImage = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'gamewin');
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
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            game.sound.stopAll();
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("menuScene");
            });
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyN)) {
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("lvl7");
            });
        }
        if (this.youDie && Phaser.Input.Keyboard.JustDown(keyR)) {
            game.sound.stopAll();
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("lvl6");
            });
        }else if (this.youDie && Phaser.Input.Keyboard.JustDown(keyM)) {
            game.sound.stopAll();
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("menuScene");
            });
        }

        // win or lose condition
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
                this.add.image(game.config.width/2, game.config.height/2, 'pass');
            }
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

        // open door method with delay
        if( this.anglenum == 0 && this.physics.world.overlap(this.girl, this.taizi) ) {
            this.playPassSound++;
            this.finishDelay++;
            this.scoreS.text = 1;
        }
        // game sound play
        if( this.playPassSound == 5){
            this.sound.play('pass');
            this.sound.volume = 0.2;
        }
        if( this.finishDelay>=30 ) {
            this.score++;
            this.gameOver = true;
            this.doorOpen.setVisible(true);
            this.physics.pause();
            this.input.keyboard.removeKey('S');
            this.input.keyboard.removeKey('UP');
            this.input.keyboard.removeKey('DOWN');
            this.input.keyboard.removeKey('LEFT');
            this.input.keyboard.removeKey('RIGHT');
            this.gamewinImage.alpha += .01;
            if(this.gamewinImage.alpha == 1){
                overConfig.color = '#000';
                this.add.image(game.config.width/2, game.config.height/2, 'pass');
            }
        }
        if( this.ci_up1.body.touching.down || this.ci_up1.body.touching.left 
            || this.ci_up2.body.touching.down || this.ci_up2.body.touching.right 
            || this.ci_down1.body.touching.left || this.ci_down1.body.touching.up 
            || this.ci_down1.body.touching.right || this.ci_down2.body.touching.left 
            || this.ci_down2.body.touching.up || this.ci_down2.body.touching.right 
            || this.ci_left.body.touching.left)
            this.youDie = true;

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

        // spider method -- touch spider to rotate 90 degrees clock-wise
        if(this.physics.world.overlap(this.girl, this.spider_1)){
            this.sound.play('spiderSound');
            this.sound.volume = 0.4;
            this.xian_1.destroy();
            this.rotate();
            this.spider_1.destroy();
        }
        if(this.physics.world.overlap(this.girl, this.spider_2)){
            this.sound.play('spiderSound');
            this.sound.volume = 0.4;
            this.xian_2.destroy();
            this.rotate();
            this.spider_2.destroy();
        }
        if(this.physics.world.overlap(this.girl, this.spider_3)){
            this.sound.play('spiderSound');
            this.sound.volume = 0.4;
            this.xian_3.destroy();
            this.rotate();
            this.spider_3.destroy();
        }

        // flower method -- touch flower to transfer
        if(this.anglenum == 90 && this.physics.world.overlap(this.girl, this.flower1)){
            this.sound.play('flowerSound');
            this.sound.volume = 0.4;
            this.rotate();
            this.changeGravity();
            this.transfer(this.flower1, this.flower2, this.sys.game.config.width*0.75, this.sys.game.config.height*0.87);
        }
        if(this.anglenum == 0 && this.physics.world.overlap(this.girl, this.flower2)){
            this.sound.play('flowerSound');
            this.sound.volume = 0.4;
            this.rotate();
            this.transfer(this.flower2, this.flower1, this.sys.game.config.width * 0.1, this.sys.game.config.height*0.42);
        }
    }

    transfer(flower1, flower2, x, y){
        flower1.destroy();
        flower2.destroy();
        this.girl.setPosition(x, y);
    }

    rotate(){
        //spider.destroy();
        this.anglenum += 90;
        if(this.anglenum >= 360){
            this.anglenum -= 360;
        }
        this.girl.angle = this.anglenum;
        if(this.anglenum == 0){
            this.girl.setGravityX(0);
            this.girl.setGravityY(this.gravityYnum);
        }else if(this.anglenum == 90){
            this.girl.body.setSize(73,50);
            this.girl.setGravityY(0);
            this.girl.setGravityX(-this.gravityXnum);
        }else if(this.anglenum == 180){
            this.girl.setGravityX(0);
            this.girl.setGravityY(-this.gravityYnum);
        }else if(this.anglenum == 270){
            this.girl.body.setSize(73,50);
            this.girl.setGravityY(0);
            this.girl.setGravityX(this.gravityXnum);
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