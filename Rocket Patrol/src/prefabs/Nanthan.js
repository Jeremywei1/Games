// Nanthan prefab
class Nanthan extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
    }

    update() {
        // left/right movement
        this.x += 1;
        this.y += 1;
        if(this.y <= 100) {
            this.y += 2;
        }else if(this.x <= 100){
            this.x += 2;
        }else if(this.y >= game.config.height - 100){
            this.y -= Phaser.Math.Between(100, 500);
        }else if(this.x >= game.config.width - 100){
            this.x -= Phaser.Math.Between(100, 500);
        }
    }
}

//if(this.x >= game.config.width-80){
//    this.x -= 1;
//}else if(this.y >= game.config.height-80){
//    this.y -= 1;
//}else if(this.x <= 80){
//    this.x += 1;
//}else if(this.y <= 80){
//    this.y += 1;
//}