// game configuration object
// Add your own (copyright-free) background music to the Play scene (10)
// Create a new scrolling tile sprite for the background (10)
// Allow the player to control the Rocket after it's fired (10)
// Create a new animated sprite for the Spaceship enemies (15)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (25)
// Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25) 
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (25)
// should be 120 in total
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

// main game object
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    supershipSpeed: 5,
    gameTimer: 60000,    
}

// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT;