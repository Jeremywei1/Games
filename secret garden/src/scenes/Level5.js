class Level5 extends Phaser.Scene {
    constructor() {
        super("lvl5");
    }

    preload() {
        this.load.image('border_down', './assets/border_down.png');
        this.load.image('border_up', './assets/border_up.png');
        this.load.image('border_left', './assets/border_left.png');
        this.load.image('border_right', './assets/border_right.png');
        this.load.image('real_border_down', './assets/realBorderdown.png');
        this.load.image('candy', './assets/candy.png');
        this.load.image('ci_22', './assets/lvl5_terrain/ci_2.png');
        this.load.image('ci_3', './assets/lvl4_sprites/ci_3.png');
        this.load.image('ci_3_ver', './assets/lvl5_terrain/ci_390.png');
        this.load.image('plat', './assets/lvl1_terrain/ground_short.png');
        this.load.image('xian', './assets/lvl2_sprites/xian.png');
        this.load.image('spider', './assets/spider.png');
        this.load.image('mid', './assets/lvl4_sprites/level4_middleUpper.png');
        this.load.image('bottom', './assets/lvl4_sprites/level4_bottomGround.png');
        this.load.image('midLengthGround', './assets/lvl5_terrain/level5_longGround.png');
        this.load.image('longLengthGround', './assets/lvl5_terrain/level5_mostRight.png');
        this.load.image('grassR', './assets/lvl5_terrain/level5_shortLeft.png');
        this.load.image('grassL', './assets/lvl5_terrain/level5_shortRight.png');
        this.load.image('door', './assets/lvl2_sprites/door.png');
        this.load.image('doorOpen', './assets/door_opened.png');
        this.load.image('taizi', './assets/lvl2_sprites/taizi.png');
        this.load.image('girl', './assets/player.png');
        this.load.image('gameover', './assets/game over.png');
        this.load.image('gamewin', './assets/gamewin.png');
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
        this.scale.setGameSize(1280,720);
        this.sys.game.config.height = 720;
        this.sys.game.config.width = 1280;
        this.cameras.main.backgroundColor.setTo(0,0,0);
        this.DRAG = 500;
        this.score = 0;
        this.gravityYnum = 2000;
        this.gravityXnum = 2000;
        this.anglenum = 0;
        this.collidecheck = false;
        this.finishDelay = 0;
        this.playPassSound = 0;
        this.deathnum = 0;

        // define keyboard keyJ
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
        // game over flag
        this.gameOver = false;
        this.youDie = false;

        // define our objects
        // door
        this.door = this.physics.add.sprite(this.sys.game.config.width*0.84, this.sys.game.config.height*0.15, 'door');
        this.door.angle += 270;
        this.door.scale = 0.8;
        this.door.setImmovable();
        this.doorOpen = this.physics.add.sprite(this.sys.game.config.width*0.838, this.sys.game.config.height*0.16, 'doorOpen');
        this.doorOpen.setVisible(false);
        this.doorOpen.setImmovable();
        this.doorOpen.angle += 270;
        this.doorOpen.scale = 0.8;

        // girl
        this.girl = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.7, 'girl');
        this.girl.setCollideWorldBounds(true);
        this.girl.setGravityY(this.gravityYnum);
        this.girl.setFlipX(true);

        // taizi
        this.taizi = this.physics.add.sprite(this.sys.game.config.width*0.882-1, this.sys.game.config.height*0.15, 'taizi');
        this.taizi.setImmovable();

        // xian
        this.xian = this.physics.add.sprite(this.sys.game.config.width*0.16, this.sys.game.config.height*0.1, 'xian');
        this.xian.setImmovable();

        // ci
        this.ci_1 = this.physics.add.sprite(this.sys.game.config.width*0.32, this.sys.game.config.height*0.13, 'ci_3');
        this.ci_1.angle+=180;
        this.ci_1.setImmovable();
        this.ci_right = this.physics.add.sprite(this.sys.game.config.width*0.91, this.sys.game.config.height*0.5, 'ci_3_ver');
        this.ci_right.displayWidth *= 0.8;
        this.ci_right.setImmovable();
        this.ci_midleft = this.physics.add.sprite(this.sys.game.config.width*0.405, this.sys.game.config.height*0.64, 'ci_22');
        this.ci_midleft.angle += 180;
        this.ci_midleft.displayWidth *= 0.8;
        this.ci_midleft.setImmovable();
        this.ci_midright = this.physics.add.sprite(this.sys.game.config.width*0.63, this.sys.game.config.height*0.35, 'ci_22');
        this.ci_midright.displayWidth *= 0.8;
        this.ci_midright.setImmovable();

        // implement grasses and terrains
        // terrain1
        this.terrain1 = this.physics.add.sprite(this.sys.game.config.width*0.35, this.sys.game.config.height*0.6485, 'midLengthGround');
        this.terrain1.setImmovable();
        this.physics.add.collider(this.girl, this.terrain1);
        // terrain2
        this.terrain2 = this.physics.add.sprite(this.sys.game.config.width*0.687, this.sys.game.config.height*0.35, 'midLengthGround');
        this.terrain2.displayHeight = this.terrain2.height * 1.2;
        this.terrain2.setImmovable();
        this.physics.add.collider(this.girl, this.terrain2);
        // terrain3
        this.terrain3 = this.physics.add.sprite(this.sys.game.config.width*0.963, this.sys.game.config.height*0.5, 'longLengthGround');
        this.terrain3.setImmovable();
        this.physics.add.collider(this.girl, this.terrain3);
        // grass1
        this.grass1 = this.physics.add.sprite(this.sys.game.config.width*0.14, this.sys.game.config.height*0.12, 'mid');
        this.grass1.angle+=180;
        this.grass1.displayWidth = this.grass1.width*1.3;
        this.grass1.displayHeight = this.grass1.height*1.3;
        this.grass1.setImmovable();
        this.physics.add.collider(this.girl, this.grass1);
        // grass2 middle left
        this.grass2 = this.physics.add.sprite(this.sys.game.config.width*0.405, this.sys.game.config.height*0.445, 'grassR');
        this.grass2.displayWidth = this.grass2.width*1.1;
        this.grass2.setImmovable();
        this.physics.add.collider(this.girl, this.grass2);
        // grass3 middle left
        this.grass3 = this.physics.add.sprite(this.sys.game.config.width*0.405, this.sys.game.config.height*0.845, 'grassR');
        this.grass3.displayWidth = this.grass3.width*1.1;
        this.grass3.setImmovable();
        this.physics.add.collider(this.girl, this.grass3);
        // grass4 middle right
        this.grass4 = this.physics.add.sprite(this.sys.game.config.width*0.63, this.sys.game.config.height*0.1, 'grassL');
        this.grass4.displayWidth = this.grass4.width*1.1;
        this.grass4.setImmovable();
        this.physics.add.collider(this.girl, this.grass4);
        // grass5 middle right
        this.grass5 = this.physics.add.sprite(this.sys.game.config.width*0.63, this.sys.game.config.height*0.585, 'grassL');
        this.grass5.displayWidth = this.grass5.width*1.1;
        this.grass5.setImmovable();
        this.physics.add.collider(this.girl, this.grass5);
        // grass6 rigther most
        this.grass6 = this.physics.add.sprite(this.sys.game.config.width*0.91, this.sys.game.config.height*0.2, 'grassL');
        this.grass6.displayWidth = this.grass6.width*1.1;
        this.grass6.setImmovable();
        this.physics.add.collider(this.girl, this.grass6);
        // grass7 rigther most
        this.grass7 = this.physics.add.sprite(this.sys.game.config.width*0.91, this.sys.game.config.height*0.8, 'grassL');
        this.grass7.displayWidth = this.grass7.width*1.1;
        this.grass7.displayHeight = this.grass7.height*1.1;
        this.grass7.setImmovable();
        this.physics.add.collider(this.girl, this.grass7);

        // spider
        this.spider = this.physics.add.sprite(this.sys.game.config.width*0.16, this.sys.game.config.height*0.3, 'spider');
        this.spider.angle+=180;
        this.spider.setImmovable();

        // place the borders
        // down border
        this.realB = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.95, 'real_border_down');
        this.borderdown = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height-36, 'border_down');
        this.borderdown.displayWidth = this.sys.game.config.width * 1.1;
        this.borderdown.displayHeight = this.borderdown.height * 1.5;
        this.realB.setImmovable(); 
        //right border
        this.borderright = this.physics.add.sprite(this.sys.game.config.width-32, this.sys.game.config.height/2, 'border_right');
        this.borderright.displayHeight = this.sys.game.config.height * 1.1;
        this.borderright.setImmovable();
        // up border
        this.borderup = this.physics.add.sprite(this.sys.game.config.width/2, 32, 'border_up');
        this.borderup.displayWidth = this.sys.game.config.width * 1.1;
        this.borderup.setImmovable();
        //left border
        this.borderleft = this.physics.add.sprite(32, this.sys.game.config.height/2, 'border_left');
        this.borderleft.displayHeight = this.sys.game.config.height * 1.1;
        this.borderleft.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.borderup);
        this.physics.add.collider(this.girl, this.realB);
        this.physics.add.collider(this.girl, this.borderleft);
        this.physics.add.collider(this.girl, this.borderright);

        // game over flag
        this.gameOver = false;

        // game over image
        this.gameoverImage = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'die');
        this.gameoverImage.alpha = 0;
        // gamewin image
        this.gamewinImage = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'gamewin');
        this.gamewinImage.alpha = 0;

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
            fixedWidth: 100
        }
        this.scoreS = this.add.text(70, 25, this.score, scoreConfig);
        scoreConfig.fontSize = '20px';
        scoreConfig.fixedWidth = 300;
        this.restart = this.add.text(120, 40, '[R] to restart lvl5', scoreConfig);

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
        if( !(keyA.isDown || keyD.isDown || keyW.isDown || keyS.isDown) ) this.girl.anims.play('walking');

        // check key input for restart
        if( this.youDie && this.deathnum == 0) {
            this.deathnum += 1;
            this.sound.play('death');
            this.sound.volume = 0.1;
        }
        if( this.youDie ){
            this.physics.pause();
            this.input.keyboard.removeKey('J');
            this.input.keyboard.removeKey('W');
            this.input.keyboard.removeKey('A');
            this.input.keyboard.removeKey('S');
            this.input.keyboard.removeKey('D');
            this.gameoverImage.alpha += .01;
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
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyN)) {
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("lvl6");
            });
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            game.sound.stopAll();
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("menuScene");
            });
        }

        // win or lose condition
        if( this.anglenum == 270 && this.physics.world.overlap(this.girl, this.taizi) ) {
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
            this.input.keyboard.removeKey('LEFT');
            this.input.keyboard.removeKey('RIGHT');
            this.input.keyboard.removeKey('UP');
            this.input.keyboard.removeKey('DOWN');
            this.gamewinImage.alpha += .01;
            if(this.gamewinImage.alpha == 1){
                this.add.image(game.config.width/2, game.config.height/2, 'pass');
            }
        }
        if( this.physics.world.overlap(this.girl, this.ci_1) || this.physics.world.overlap(this.girl, this.ci_right) || this.physics.world.overlap(this.girl, this.ci_midleft) || this.physics.world.overlap(this.girl, this.ci_midright) )
            this.youDie = true;
            
        // move methods 
        if(this.anglenum == 0){ // down border
            if( keyA.isDown ){
                this.girl.body.setVelocityX(-200);
                this.girl.setFlipX(true);
            }else if ( keyD.isDown ){
                this.girl.body.setVelocityX(200);
                this.girl.setFlipX(false);
            }else {
                this.girl.body.setDragX(this.DRAG);
            }
        }else if(this.anglenum == 180){ // up border
            if( keyA.isDown ){
                this.girl.body.setVelocityX(-200);
                this.girl.setFlipX(false);
            }else if ( keyD.isDown ){
                this.girl.body.setVelocityX(200);
                this.girl.setFlipX(true);
            }else {
                this.girl.body.setDragX(this.DRAG);
            }
        }else if(this.anglenum == 90){ // left border
            if( keyW.isDown ){
                this.girl.body.setVelocityY(-200);
                this.girl.setFlipX(true);
            }else if ( keyS.isDown ){
                this.girl.body.setVelocityY(200);
                this.girl.setFlipX(false);
            }else {
                this.girl.body.setDragY(this.DRAG);
            }
        }else if(this.anglenum == 270){ // right border
            if( keyW.isDown ){
                this.girl.body.setVelocityY(-200);
                this.girl.setFlipX(false);
            }else if ( keyS.isDown ){
                this.girl.body.setVelocityY(200);
                this.girl.setFlipX(true);
            }else {
                this.girl.body.setDragY(this.DRAG);
            }
        }
        
        // gravity-change method
        if(  !this.collidecheck && Phaser.Input.Keyboard.JustDown(keyJ) ){
            this.collidecheck = true;
            this.changeGravity();
            this.sound.play('jse');
            this.sound.volume = 0.4;
        }

        // spider method -- touch spider to rotate 90 degrees clock-wise
        if(this.physics.world.overlap(this.girl, this.spider)){
            this.sound.play('spiderSound');
            this.sound.volume = 0.4;
            this.rotate(this.spider);
        }

        // candy collect method
        if(this.physics.world.overlap(this.girl, this.candy1)){
            this.candycollect(this.candy1);
        }
    }

    rotate(spider){
        this.xian.destroy();
        spider.destroy();
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
}