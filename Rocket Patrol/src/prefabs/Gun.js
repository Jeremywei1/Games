// Gun prefab
class Gun extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add object to existing scene, displayList, updateList
        this.isFiring = false;    // track Gun's firing status

        this.sfxGun = scene.sound.add('sfx_rocket'); // add Gun sfx
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= 47){
                this.x -= 2;
            }else if(keyRIGHT.isDown && this.x <= 578){
                this.x += 2;
            }
        }

        // fire button (NOT spacebar)
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxGun.play();  // play sfx
        }


        // if fired, move up
        if(this.isFiring && this.y >= 108) {
            this.y -= 2;
            this.x -= 3;
        }

        // reset on miss
        if(this.y <= 108) {
            this.isFiring = false;
            this.y = 431;
        }
    }

    reset(){
        this.isFiring = false;
        this.y = 431;
    }
}