class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('dart1', './assets/dart1.png');
        this.load.image('dart2', './assets/dart2.png');
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

        // define keys
        let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        let keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        let keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        let keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //checks if it needs to create 1 or 2 darts
        if (game.settings.players == 1) {
            this.p1Dart = new Dart(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'dart1', 0, keyA, keyD, keyW).setOrigin(0.5, 0);
        } else {
            this.p1Dart = new Dart(this, game.config.width/3, game.config.height - borderUISize - borderPadding, 'dart1', 0, keyA, keyD, keyW).setOrigin(0.5, 0);
            this.p2Dart = new Dart(this, game.config.width*2/3, game.config.height - borderUISize - borderPadding, 'dart2', 0, keyLEFT, keyRIGHT, keyUP).setOrigin(0.5,0);
        }

        // animation config
        this.anims.create({
            key: 'rpop',
            frames: this.anims.generateFrameNumbers('rpop', { start: 0, end: 5, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        let scoreConfig = {
            fontFamily: 'luckiest',
            fontSize: '30px',
            backgroundColor: '#821a7b',
            color: '#fcec3c',
            align: 'right',
            padding: {
                bottom: 5,
            },
            fixedWidth: 100
        }
        let scoreConfig2 = {
            fontFamily: 'luckiest',
            fontSize: '30px',
            backgroundColor: '#821a7b',
            color: '#d42c2c',
            align: 'right',
            padding: {
                bottom: 5,
            },
            fixedWidth: 100
        }
        let timeConfig = {
            fontFamily: 'luckiest',
            fontSize: '30px',
            backgroundColor: '#821a7b',
            color: '#fcec3c',
            align: 'right',
            padding: {
                bottom: 5,
            },
        }
        let endConfig = {
            fontFamily: 'luckiest',
            fontSize: '75px',
            color: '#fcec3c',
            align: 'center',
        }
        //adds score
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 370, 'P1: ' + this.p1Score, scoreConfig);
        if (game.settings.players == 2) {
            this.scoreLeft2 = this.add.text(borderUISize + borderPadding, 400, 'P2: ' + this.p2Score, scoreConfig2);
        }

        //shows time left
        this.timeLeft = this.add.text(game.config.width - 200, 370, 'Time Left ' + (game.settings.gameTimer/1000), timeConfig);

        // GAME OVER flag
        this.gameOver = false;

        //checks if time is up
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, 100, 'GAME OVER', endConfig).setOrigin(0.5);
            endConfig.fontSize = '30px';
            if (game.settings.players == 2) {
                if (this.p1Score > this.p2Score) {
                    this.add.text(game.config.width/2, game.config.height/2 - 25, 'Player 1 Wins', endConfig).setOrigin(0.5);
                } else if (this.p1Score < this.p2Score) {
                    this.add.text(game.config.width/2, game.config.height/2 - 25, 'Player 2 Wins', endConfig).setOrigin(0.5);
                } else {
                    this.sound.play('sfx_nowin');
                    this.add.text(game.config.width/2, game.config.height/2 - 25, 'No One Won', endConfig).setOrigin(0.5);
                }
            }
            this.add.text(game.config.width/2, game.config.height - 160, 'Press (R) to Restart or (F) to Menu', endConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        //updates time left
        this.timeLeft.text = 'Time Left ' + Math.ceil(this.clock.getOverallRemainingSeconds());

        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start("menuScene");
        }

        //updates if game is not over yet
        if(!this.gameOver) {
            //update map
            this.map.tilePositionX -= 4;    
            //update p1
            this.p1Dart.update();             
            if (game.settings.players == 2) {
                //update p2
                this.p2Dart.update();
            }
            // update bloons (x4/5)
            this.bloon01.update();           
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
            this.p1Score += this.bloon05.points;
            this.scoreLeft.text = 'P1: ' + this.p1Score;
        }

        if (this.checkCollision(this.p1Dart, this.bloon04)) {
            this.p1Dart.reset();
            this.bloonPop(this.bloon04);
            this.p1Score += this.bloon04.points;
            this.scoreLeft.text = 'P1: ' + this.p1Score;
        }
        if(this.checkCollision(this.p1Dart, this.bloon03)) {
            this.p1Dart.reset();
            this.bloonPop(this.bloon03);
            this.p1Score += this.bloon03.points;
            this.scoreLeft.text = 'P1: ' + this.p1Score;
        }
        if (this.checkCollision(this.p1Dart, this.bloon02)) {
            this.p1Dart.reset();
            this.bloonPop(this.bloon02);
            this.p1Score += this.bloon02.points;
            this.scoreLeft.text = 'P1: ' + this.p1Score;
        }
        if (this.checkCollision(this.p1Dart, this.bloon01)) {
            this.p1Dart.reset();
            this.bloonPop(this.bloon01);
            this.p1Score += this.bloon01.points;
            this.scoreLeft.text = 'P1: ' + this.p1Score;
        }
        if (game.settings.players == 2) {
            if (game.settings.difficulty == 3 && this.checkCollision(this.p2Dart, this.bloon05)) {
                this.p2Dart.reset();
                this.bloonPop(this.bloon05);
                this.p2Score += this.bloon05.points;
                this.scoreLeft2.text = 'P2: ' + this.p2Score;
            }

            if (this.checkCollision(this.p2Dart, this.bloon04)) {
                this.p2Dart.reset();
                this.bloonPop(this.bloon04);
                this.p2Score += this.bloon04.points;
                this.scoreLeft2.text = 'P2: ' + this.p2Score;
            }
            if(this.checkCollision(this.p2Dart, this.bloon03)) {
                this.p2Dart.reset();
                this.bloonPop(this.bloon03);
                this.p2Score += this.bloon03.points;
                this.scoreLeft2.text = 'P2: ' + this.p2Score;
            }
            if (this.checkCollision(this.p2Dart, this.bloon02)) {
                this.p2Dart.reset();
                this.bloonPop(this.bloon02);
                this.p2Score += this.bloon02.points;
                this.scoreLeft2.text = 'P2: ' + this.p2Score;
            }
            if (this.checkCollision(this.p2Dart, this.bloon01)) {
                this.p2Dart.reset();
                this.bloonPop(this.bloon01);
                this.p2Score += this.bloon01.points;
                this.scoreLeft2.text = 'P2: ' + this.p2Score;
            }
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
        // temporarily hide balloon                        
        // create explosion sprite at balloons's position
        if (bloon.type == 0) {
            bloon.alpha = 0;
            let boom = this.add.sprite(bloon.x, bloon.y, 'rpop').setOrigin(0, 0); 
            this.sound.play('sfx_explosion');
            boom.anims.play('rpop'); 
            boom.on('animationcomplete', () => {    // callback after anim completes
                bloon.resetcolor();                         // reset balloon color and position
                bloon.alpha = 1;                       // make ship visible again
                boom.destroy();                       // remove explosion sprite
            });
        } else {
            this.sound.play('sfx_explosion');
            //lower balloon's type
            if (bloon.type == 3) {
                bloon.type = 2;
                bloon.setTexture(bloon.bloons[bloon.type]);
                bloon.points = 30;
                bloon.moveSpeed = 3.5;
            } else if (bloon.type == 2){
                bloon.type = 1;
                bloon.setTexture(bloon.bloons[bloon.type]);
                bloon.points = 20;
                bloon.moveSpeed = 3.25;
            } else {
                bloon.type = 0;
                bloon.setTexture(bloon.bloons[bloon.type]);
                bloon.points = 10;
                bloon.moveSpeed = 3;
            }
        }
      }
}