// Name: Danny Chung
// Project: Bloons Patrol
// Date: 4/17/2022
// Time Taken: 3:50pm - 7:30pm 5:30pm-7pm 9pm - ?

// Points Breakdown
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
// Implement a simultaneous two-player mode (30)

// Sources
// Balloons assests taken directly from Bloons Tower Defense 6
// Balloon pop sound taken from youtube which is also from BTD6
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: '#4488aa',
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;