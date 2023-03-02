//Timeship prefab
class Timeship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, timeValue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add object to existing scene, displayList, updateList
        this.points = 0;
        this.time = timeValue;
    }

    update() {
        // move spaceship left
        this.x -= 4;
        // wraparound screen bounds
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    reset(){
        this.x = game.config.width;
    }
}
