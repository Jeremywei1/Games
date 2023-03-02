class Level7 extends Phaser.Scene {
    constructor() {
        super("lvl7");
    }

    preload() {
        this.load.image('border_down', './assets/border_down.png');
        this.load.image('real_border_down', './assets/realBorderdown.png');
        this.load.image('border_up', './assets/border_up.png');
        this.load.image('border_left', './assets/border_left.png');
        this.load.image('border_right', './assets/border_right.png');
        this.load.image('xian', './assets/lvl2_sprites/xian.png');
        this.load.image('spider', './assets/spider.png');
        this.load.image('ghost', './assets/lvl7_sprites/lv6_ghost.png');
        this.load.image('ci_2', './assets/lvl4_sprites/ci_2.png');
        this.load.image('ci_3', './assets/lvl4_sprites/ci_3.png');
        this.load.image('ci_4', './assets/lvl7_sprites/ci_4.png');
        this.load.image('sPlain1', './assets/lvl7_sprites/right_wall.png');
        this.load.image('lPlain1', './assets/lvl7_sprites/Left_wall.png');
        this.load.image('sGrass1', './assets/lvl7_sprites/lv6_rightland.png');
        this.load.image('taizi', './assets/lvl2_sprites/taizi.png');
        this.load.image('door', './assets/lvl2_sprites/door.png');
        this.load.image('doorOpen', './assets/door_opened.png');
        this.load.image('flower1', './assets/lvl7_sprites/flower_lv6L.png');
        this.load.image('flower2', './assets/lvl7_sprites/flower_lv6R.png');
        this.load.image('dundun', './assets/lvl6_sprites/level6_middle.png');
        this.load.image('gameover', './assets/game over.png');
        this.load.image('gamewin', './assets/gamewin.png');
        this.load.image('die', './assets/die.png');
        this.load.image('win1', './assets/win1.png');
        this.load.spritesheet('girl', './assets/playerWalk.png', {frameWidth: 48, frameHeight: 98, startFrame: 0, endFrame: 0});
        this.load.spritesheet('walk', './assets/playerWalk.png', {frameWidth: 48, frameHeight: 98, startFrame: 0, endFrame: 4});

        // preload.music
        this.load.audio('jse', './assets/changeG.wav');
        this.load.audio('spiderSound', './assets/spiderG.wav');
        this.load.audio('pass', './assets/pass.wav');
        this.load.audio('flowerSound', './assets/flowerSound.wav');
        this.load.audio('death', './assets/death.wav');
    }

    create(){
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
        this.deathnum = 0;
        this.playPassSound = 1;
        this.ghostSpeed1 = 100;
        this.ghostSpeed2 = -100;
        this.ghostSpeed3 = -100;
        this.ghostSpeed4 = 100;
        this.ghostSpeed5 = 200;

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

        // taizi
        this.taizi = this.physics.add.sprite(this.sys.game.config.width*0.92, this.sys.game.config.height*0.605, 'taizi');
        this.taizi.setImmovable();

        // door
        this.door = this.physics.add.sprite(this.sys.game.config.width*0.92, this.sys.game.config.height*0.605, 'door');
        this.door.setImmovable();
        this.door.angle += 270;
        this.door.scale = 0.8;
        this.doorOpen = this.physics.add.sprite(this.sys.game.config.width*0.92, this.sys.game.config.height*0.605, 'doorOpen');
        this.doorOpen.setVisible(false);
        this.doorOpen.setImmovable();
        this.doorOpen.angle += 270;
        this.doorOpen.scale = 0.8;

        // girl
        this.girl = this.physics.add.sprite(this.sys.game.config.width/6, this.sys.game.config.height*0.8, 'girl');
        this.girl.setCollideWorldBounds(true);
        this.girl.setGravityY(this.gravityYnum);
        this.girl.setFlipX(true);

        // xian
        this.xian_1 = this.physics.add.sprite(this.sys.game.config.width*0.361, this.sys.game.config.height*0.02, 'xian');
        this.xian_1.setImmovable();
        this.xian_2 = this.physics.add.sprite(this.sys.game.config.width*0.434, this.sys.game.config.height*0.06, 'xian');
        this.xian_2.setImmovable();
        this.xian_3 = this.physics.add.sprite(this.sys.game.config.width*0.507, this.sys.game.config.height*0.12, 'xian');
        this.xian_3.setImmovable();
        
        // spider
        this.spider_1 = this.physics.add.sprite(this.sys.game.config.width*0.361, this.sys.game.config.height*0.19, 'spider');
        this.spider_1.setImmovable();
        this.spider_1.scale = 0.6;
        this.spider_1.angle+=180;
        this.spider_2 = this.physics.add.sprite(this.sys.game.config.width*0.434, this.sys.game.config.height*0.25, 'spider');
        this.spider_2.setImmovable();
        this.spider_2.scale = 0.6;
        this.spider_2.angle+=180;
        this.spider_3 = this.physics.add.sprite(this.sys.game.config.width*0.507, this.sys.game.config.height*0.31, 'spider');
        this.spider_3.setImmovable();
        this.spider_3.scale = 0.6;
        this.spider_3.angle+=180;
        
        // flowers
        this.flower1 = this.physics.add.sprite(this.sys.game.config.width*0.15, this.sys.game.config.height*0.15, 'flower1');
        this.flower2 = this.physics.add.sprite(this.sys.game.config.width*0.7, this.sys.game.config.height*0.15, 'flower2');
        this.flower1.scale = 0.9;
        this.flower2.scale = 0.9;
        this.flower1.setImmovable();
        this.flower2.setImmovable();

        // ci
        // 1dle
        this.ci_mid1 = this.physics.add.sprite(this.sys.game.config.width*0.385, this.sys.game.config.height*0.87, 'ci_2');
        this.ci_mid2 = this.physics.add.sprite(this.sys.game.config.width*0.495, this.sys.game.config.height*0.87, 'ci_3');
        this.ci_mid3 = this.physics.add.sprite(this.sys.game.config.width*0.8, this.sys.game.config.height*0.87, 'ci_3');
        // setImmovable
        this.ci_mid1.setImmovable();
        this.ci_mid2.setImmovable();
        this.ci_mid3.setImmovable();
        // colliders
        this.physics.add.collider(this.girl, this.ci_mid1);
        this.physics.add.collider(this.girl, this.ci_mid2);
        this.physics.add.collider(this.girl, this.ci_mid3);

        // platforms
        // plains
        this.lPlain1 = this.physics.add.sprite(this.sys.game.config.width*0.3, this.sys.game.config.height*0.5, 'lPlain1');
        this.sPlain1 = this.physics.add.sprite(this.sys.game.config.width*0.6, this.sys.game.config.height*0.25, 'sPlain1');
        this.grassL = this.physics.add.sprite(this.sys.game.config.width*0.675, this.sys.game.config.height*0.457, 'sGrass1');
        this.grassR = this.physics.add.sprite(this.sys.game.config.width*0.925, this.sys.game.config.height*0.457, 'sGrass1');
        // dundun
        this.dundun1 = this.physics.add.sprite(this.sys.game.config.width*0.65, this.sys.game.config.height*0.97, 'dundun');
        this.dundun2 = this.physics.add.sprite(this.sys.game.config.width*0.95, this.sys.game.config.height*0.97, 'dundun');
        this.dundun1.displayWidth*=1.1;
        this.dundun2.displayWidth*=1.1;
        this.dundun1.displayHeight *= 1.59;
        this.dundun2.displayHeight *= 1.59;
        // setImmovable
        this.lPlain1.setImmovable();
        this.sPlain1.setImmovable();
        this.grassL.setImmovable();
        this.grassR.setImmovable();
        this.dundun1.setImmovable();
        this.dundun2.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.lPlain1);
        this.physics.add.collider(this.girl, this.sPlain1);
        this.physics.add.collider(this.girl, this.grassL);
        this.physics.add.collider(this.girl, this.grassR);
        this.physics.add.collider(this.girl, this.dundun1);
        this.physics.add.collider(this.girl, this.dundun2);

        // ghost
        this.ghost1 = this.physics.add.sprite(this.sys.game.config.width*0.1, this.sys.game.config.height*0.45, 'ghost');
        this.ghost2 = this.physics.add.sprite(this.sys.game.config.width*0.24, this.sys.game.config.height*0.55, 'ghost');
        this.ghost3 = this.physics.add.sprite(this.sys.game.config.width*0.36, this.sys.game.config.height*0.4, 'ghost');
        this.ghost4 = this.physics.add.sprite(this.sys.game.config.width*0.5, this.sys.game.config.height*0.49, 'ghost');
        this.ghost5 = this.physics.add.sprite(this.sys.game.config.width*0.69, this.sys.game.config.height*0.33, 'ghost');

        // place the borders
        // down border
        this.realB = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.95, 'real_border_down');
        this.borderdown = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height-36, 'border_down');
        this.borderdown.displayWidth = this.sys.game.config.width * 1.1;
        this.borderdown.displayHeight = this.borderdown.height * 1.5;
        this.realB.setImmovable(); 
        
        // right border
        this.borderright = this.physics.add.sprite(this.sys.game.config.width-32, this.sys.game.config.height/2, 'border_right');
        this.borderright.displayHeight = this.sys.game.config.height * 1.1;
        this.borderright.setImmovable();

        // up border
        this.realBup = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.05, 'real_border_down');
        this.borderup = this.physics.add.sprite(this.sys.game.config.width/2, 36, 'border_up');
        this.borderup.displayWidth = this.sys.game.config.width * 1.1;
        this.borderup.displayHeight = this.borderup.height * 1.5;
        this.realBup.setImmovable();

        // left border
        this.borderleft = this.physics.add.sprite(32, this.sys.game.config.height/2, 'border_left');
        this.borderleft.displayHeight = this.sys.game.config.height * 1.1;
        this.borderleft.setImmovable();

        // add the colliders
        this.physics.add.collider(this.girl, this.realBup);
        this.physics.add.collider(this.girl, this.realB);
        this.physics.add.collider(this.girl, this.borderleft);
        this.physics.add.collider(this.girl, this.borderright);

        // game over flag
        this.gameOver = false;

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
        this.restart = this.add.text(120, 40, '[R] to restart lvl7', scoreConfig);

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

    update(){
        
        /*this.ghost2.setVelocityX(100);
        this.ghost3.setVelocityX(100);
        this.ghost4.setVelocityX(100);
        this.ghost5.setVelocityX(100);*/
        // switch once until the girl collide with something
        this.checkswitch();

        // check angle within 360 degrees
        if(this.anglenum >= 360) this.anglenum -= 360;

        // walking animation
        if( !(keyLEFT.isDown || keyRIGHT.isDown || keyUP.isDown || keyDOWN.isDown) ) this.girl.anims.play('walking');

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
        if (this.youDie && Phaser.Input.Keyboard.JustDown(keyR)) {
            game.sound.stopAll();
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("lvl7");
            });
        }else if (this.youDie && Phaser.Input.Keyboard.JustDown(keyM)) {
            game.sound.stopAll();
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("menuScene");
            });
        }

        // lose scene play
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
                this.add.image(game.config.width/2, game.config.height/2, 'die');
            }
        }

        // open door method with delay
        if( this.anglenum == 0 && this.physics.world.overlap(this.girl, this.taizi) ) {
            this.playPassSound++;
            this.finishDelay++;
            this.scoreS.text = 1;
        }

        // win or lose condition
        if( this.ci_mid1.body.touching.up
            || this.ci_mid2.body.touching.up
            || this.ci_mid3.body.touching.up)
            this.youDie = true;

        // score method
        if( this.anglenum == 270 && this.physics.world.overlap(this.girl, this.taizi) ) {
            this.playPassSound++;
            this.finishDelay++;
            this.scoreS.text = 1;
        }
        // game over sound
        if( this.playPassSound == 5){
            this.sound.play('pass');
            this.sound.volume = 0.4;
        }

        if( this.finishDelay>30 ) {
            this.score++;
            this.gamewinImage.alpha += .01;
            this.gameOver = true;
            this.door.setVisible(false);
            this.doorOpen.setVisible(true);
            this.physics.pause();
            this.input.keyboard.removeKey('S');
            this.input.keyboard.removeKey('UP');
            this.input.keyboard.removeKey('up');
            this.input.keyboard.removeKey('LEFT');
            this.input.keyboard.removeKey('RIGHT');
            if(this.gamewinImage.alpha == 1){
                overConfig.color = '#000';
                this.add.image(game.config.width/2, game.config.height/2, 'win1');
            }
        }

        // ghost method
        if(this.physics.world.overlap(this.girl, this.ghost1)){
            this.ghost(this.ghost1);
        }else if(this.physics.world.overlap(this.girl, this.ghost2)){
            this.ghost(this.ghost2);
        }else if(this.physics.world.overlap(this.girl, this.ghost3)){
            this.ghost(this.ghost3);
        }else if(this.physics.world.overlap(this.girl, this.ghost4)){
            this.ghost(this.ghost4);
        }else if(this.physics.world.overlap(this.girl, this.ghost5)){
            this.ghost(this.ghost5);
        }
        
        // ghost moving
        // ghost 1/2
        if(!this.youDie){
            this.ghost1.setVelocityX(this.ghostSpeed1);
            this.ghost2.setVelocityX(this.ghostSpeed2);
            if(this.physics.world.overlap(this.ghost1, this.lPlain1)){
                this.ghost1.setVelocityX(this.ghostSpeed1*=-1);
            }else if(this.physics.world.overlap(this.ghost1, this.borderleft)){
                this.ghost1.setVelocityX(this.ghostSpeed1*=-1);
            }else{
                this.ghost1.setVelocityX(this.ghostSpeed1);
            }
            if(this.physics.world.overlap(this.ghost2, this.lPlain1)){
                this.ghost2.setVelocityX(this.ghostSpeed2*=-1);
            }else if(this.physics.world.overlap(this.ghost2, this.borderleft)){
                this.ghost2.setVelocityX(this.ghostSpeed2*=-1);
            }else{
                this.ghost2.setVelocityX(this.ghostSpeed2);
            }
        }
        // ghost 3/4
        if(!this.youDie){
            this.ghost3.setVelocityX(this.ghostSpeed3);
            this.ghost4.setVelocityX(this.ghostSpeed4);
            if(this.physics.world.overlap(this.ghost3, this.sPlain1)){
                this.ghost3.setVelocityX(this.ghostSpeed3*=-1);
            }else if(this.physics.world.overlap(this.ghost3, this.lPlain1)){
                this.ghost3.setVelocityX(this.ghostSpeed3*=-1);
            }else{
                this.ghost3.setVelocityX(this.ghostSpeed3);
            }
            if(this.physics.world.overlap(this.ghost4, this.sPlain1)){
                this.ghost4.setVelocityX(this.ghostSpeed4*=-1);
            }else if(this.physics.world.overlap(this.ghost4, this.lPlain1)){
                this.ghost4.setVelocityX(this.ghostSpeed4*=-1);
            }else{
                this.ghost4.setVelocityX(this.ghostSpeed4);
            }
        }
        // ghost 5
        if(!this.youDie){
            this.ghost5.setVelocityX(this.ghostSpeed5);
            if(this.physics.world.overlap(this.ghost5, this.borderright)){
                this.ghost5.setVelocityX(this.ghostSpeed5*=-1);
            }else if(this.physics.world.overlap(this.ghost5, this.sPlain1)){
                this.ghost5.setVelocityX(this.ghostSpeed5*=-1);
            }else{
                this.ghost5.setVelocityX(this.ghostSpeed5);
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
        if( !this.collidecheck && Phaser.Input.Keyboard.JustDown(keyS) ){
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
        if(this.anglenum == 180 && this.physics.world.overlap(this.girl, this.flower1)){
            this.sound.play('flowerSound');
            this.sound.volume = 0.4;
            this.rotateF();
            this.changeGravity();
            this.transfer(this.flower1, this.flower2, this.sys.game.config.width*0.7, this.sys.game.config.height*0.2);
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

    rotateF(){
        //spider.destroy();
        this.anglenum += 180;
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

    ghost(ghost){
        ghost.destroy();
        this.youDie = true;
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