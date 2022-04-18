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
        this.load.image('muddy', './assets/map1.png');
        this.load.image('bloody', './assets/map2.png');
        // load spritesheet
        this.load.spritesheet('rpop', './assets/rbloonpop.png', {frameWidth: 40, frameHeight: 54, startFrame: 0, endFrame: 5});
    }

    create() {
        // place tile sprite and bloons
        if (game.settings.difficulty == 3) {
            this.map = this.add.tileSprite(0, 0, 640, 480, 'bloody').setOrigin(0, 0);
            this.bloon05 = new Bloon(this, game.config.width, borderUISize*7, 'bbloon', 1, 20, 3.25).setOrigin(0,0);
            this.bloon04 = new Bloon(this, game.config.width/2, borderUISize*7, 'bbloon', 1, 20, 3.25).setOrigin(0,0);
            this.bloon03 = new Bloon(this, game.config.width + borderUISize, borderUISize*5 - 5, 'gbloon', 2, 30, 3.5).setOrigin(0,0);
            this.bloon02 = new Bloon(this, game.config.width, borderUISize*3 - 10, 'pbloon', 3, 50, 6).setOrigin(0,0);
            this.bloon01 = new Bloon(this, game.config.width + borderUISize*4, 10, 'pbloon', 3, 50, 6).setOrigin(0,0);
        } else if (game.settings.difficulty == 2) {
            this.map = this.add.tileSprite(0, 0, 640, 480, 'muddy').setOrigin(0, 0);
            this.bloon04 = new Bloon(this, game.config.width, borderUISize*6 + borderPadding*3, 'rbloon', 0, 10, 3).setOrigin(0,0);
            this.bloon03 = new Bloon(this, game.config.width + borderUISize, borderUISize*5 - 5, 'rbloon', 0, 10, 3).setOrigin(0,0);
            this.bloon02 = new Bloon(this, game.config.width + borderUISize*2, borderUISize*3 - 10, 'bbloon', 1, 20, 3.25).setOrigin(0,0);
            this.bloon01 = new Bloon(this, game.config.width + borderUISize*3 - 5, 13, 'gbloon', 2, 30, 3.5).setOrigin(0,0);
        } else {
            this.map = this.add.tileSprite(0, 0, 640, 480, 'muddy').setOrigin(0, 0);
            this.bloon04 = new Bloon(this, game.config.width, borderUISize*6 + borderPadding*3, 'rbloon', 0, 10, 3).setOrigin(0,0);
            this.bloon03 = new Bloon(this, game.config.width + borderUISize, borderUISize*5 - 5, 'rbloon', 0, 10, 3).setOrigin(0,0);
            this.bloon02 = new Bloon(this, game.config.width + borderUISize*2, borderUISize*3 - 10, 'rbloon', 0, 10, 3).setOrigin(0,0);
            this.bloon01 = new Bloon(this, game.config.width + borderUISize*3 - 5, 13, 'bbloon', 1, 20, 3.25).setOrigin(0,0);
        }

        // // green UI background
        // this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // // white borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // define keys
        let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        let keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        let keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        let keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        let keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        console.log(game.settings.players);
        console.log(game.settings.difficulty);
        console.log(game.settings.gameTimer);
        if (game.settings.players == 1) {
            console.log("innit");
            this.p1Dart = new Dart(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'dart', 0, keyA, keyD, keyW).setOrigin(0.5, 0);
            console.log("lol");
        }

        // animation config
        this.anims.create({
            key: 'rpop',
            frames: this.anims.generateFrameNumbers('rpop', { start: 0, end: 5, first: 0}),
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

        if(!this.gameOver) {
            this.map.tilePositionX -= 4;  // update tile sprite
            this.p1Dart.update();             // update p1
            this.bloon01.update();            // update bloons (x4/5)
            this.bloon02.update();
            this.bloon03.update();
            this.bloon04.update();
            if (game.settings.difficulty == 3) {
                this.bloon05.update();
            }
        }

        // check collisions
        if (game.settings.difficulty == 3 && this.checkCollision(this.p1Dart, this.bloon05)) {
            this.p1Dart.reset();
            this.bloonPop(this.bloon05);
        }

        if (this.checkCollision(this.p1Dart, this.bloon04)) {
            this.p1Dart.reset();
            this.bloonPop(this.bloon04);
        }
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
            dart.height + dart.y > bloon.y) {
                return true;
        } else {
            return false;
        }
    }

    bloonPop(bloon) {
        // score add
        this.p1Score += bloon.points;
        this.scoreLeft.text = this.p1Score; 
        // temporarily hide ship                         
        // create explosion sprite at ship's position
        if (bloon.type == 0) {
            bloon.alpha = 0;
            let boom = this.add.sprite(bloon.x, bloon.y, 'rpop').setOrigin(0, 0); 
            this.sound.play('sfx_explosion');
            boom.anims.play('rpop'); 
            boom.on('animationcomplete', () => {    // callback after anim completes
                bloon.resetcolor();                         // reset ship position
                bloon.alpha = 1;                       // make ship visible again
                boom.destroy();                       // remove explosion sprite
            });
        } else {
            this.sound.play('sfx_explosion');
            if (bloon.type == 3) {
                bloon.type -= 1;
                bloon.setTexture(bloon.bloons[bloon.type]);
                bloon.points = 30;
                bloon.moveSpeed = 3.5;
            } else {
                bloon.type -= 1;
                bloon.setTexture(bloon.bloons[bloon.type]);
                bloon.points -= 10;
                bloon.moveSpeed -= .25;
            }
        }
      }
}