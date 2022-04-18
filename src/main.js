// Name: Danny Chung
// Project: Bloons Patrol
// Date: 4/17/2022
// Time Taken: 3:50pm - 7:30pm 5:30pm-7pm 9pm - 2am -> 10hrs total

// Points Breakdown
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
// Changed theme to Bloons Tower Defense 6 theme

// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Created 3 new 'spaceships' that are all smaller, faster, and worth more than the previous

// Implement a simultaneous two-player mode (30)
// Display the time remaining (in seconds) on the screen (10)

// Sources
// Balloons assets taken directly from Bloons Tower Defense 6
// All sounds taken from youtube which is directly from BTD6
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: '#55215b',
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR;