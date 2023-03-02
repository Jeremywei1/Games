// Date:          2020/05/03
// Group member:  Jia Wei, Rui Chen, Sunny Yan, Zihao Liu
// Game Name:     Slidding Seal
// Creating Tilt: 1. We looked beyond the class examples and learned how 
//                   to create infinite random ice cubes using phaser.math, 
//                   create animations, and find proper collision detection.
//                2. In our design, we have great visual style, harmonious background music, 
//                   and various sound effects.
// Citation：
//          Play scene 
//          Radiant Mythology.  “Yasuda Takuya - Funny Companion”  Tales of the World.
//          Nov 7th, 2014  https://downloads.khinsider.com/game-soundtracks/album/tales-of-the-world-radiant-mythology/Yasuda%2520Takuya%2520-%2520Funny%2520Companion.mp3 
//          jump effect 
//          http://www.orangefreesounds.com/boing-sound-effect/  Alexander 
//          Menu scene 
//          Bossa Nova drum with bass and synth rhythm.Free music loops in wav format.
//          Sound from Korg PSS 50 analog groovebox,1980s drum machine.http://www.orangefreesounds.com/bossa-nova-drum-with-bass-and-synth-rhythm/ Alexander

// game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ Menu, Play ]

}

// main game object
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyUP, keyLEFT;
