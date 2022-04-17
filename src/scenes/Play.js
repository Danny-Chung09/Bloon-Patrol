class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('dart', './assets/dart.png');
        this.load.image('rbloon', './assets/RedBloon.png');
        this.load.image('bbloon', './assets/BlueBloon.png');
        this.load.image('gbloon', './assets/GreenBloon.png');
        this.load.image('pbloon', './assets/PinkBloon.png');
        this.load.image('starfield', './assets/map1.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // add Dart (p1)
        this.p1Dart = new Dart(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'dart').setOrigin(0.5, 0);

        // add Bloons (x3)
        this.bloon01 = new BlueBloon(this, game.config.width + borderUISize*6, borderUISize*4, 'bbloon', 0).setOrigin(0, 0);
        this.bloon02 = new GreenBloon(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'gbloon', 0).setOrigin(0,0);
        this.bloon03 = new PinkBloon(this, game.config.width, borderUISize*6 + borderPadding*4, 'pbloon', 0).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite

        if(!this.gameOver) {
            this.p1Dart.update();             // update p1
            this.bloon01.update();               // update spaceship (x3)
            this.bloon02.update();
            this.bloon03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Dart, this.bloon03)) {
            this.p1Dart.reset();
            this.bloonPop(this.bloon03);
        }
        if (this.checkCollision(this.p1Dart, this.bloon02)) {
            this.p1Dart.reset();
            this.bloonPop(this.bloon02);
        }
        if (this.checkCollision(this.p1Dart, this.bloon01)) {
            this.p1Dart.reset();
            this.bloonPop(this.bloon01);
        }
    }

    checkCollision(dart, bloon) {
        // simple AABB checking
        if (dart.x < bloon.x + bloon.width && 
            dart.x + dart.width > bloon.x && 
            dart.y < bloon.y + bloon.height &&
            dart.height + dart.y > bloon. y) {
                return true;
        } else {
            return false;
        }
    }

    bloonPop(bloon) {
        // temporarily hide ship
        bloon.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(bloon.x, bloon.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            bloon.reset();                         // reset ship position
            bloon.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += bloon.points;
        this.scoreLeft.text = this.p1Score; 
        
        this.sound.play('sfx_explosion');
      }
}