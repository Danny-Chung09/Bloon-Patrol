// Bloon prefab
class Bloon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, type, point, speed) {
        super(scene, x, y, texture, type, point, speed);
        this.bloons = ['rbloon','bbloon','gbloon','pbloon'];
        this.type = type;
        scene.add.existing(this);   // add to existing scene              
        this.points = point;            // store pointValue
        this.moveSpeed = speed;        // pixels per frame
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }

    // position reset
    resetcolor() {
        //hard difficulty
        if (game.settings.difficulty == 3) {
            //blue bloon
            if (this.y == borderUISize*7) {
                this.setTexture(this.bloons[1]);
                this.type = 1;
                this.points = 20;
                this.moveSpeed = 3.25; 
            } else if (this.y == borderUISize*5 - 5) {
                //green bloon
                this.setTexture(this.bloons[2]);
                this.type = 2;
                this.points = 30;
                this.moveSpeed = 3.5;
            } else {
                //pink bloon 
                this.setTexture(this.bloons[3]);
                this.type = 3;
                this.points = 50;
                this.moveSpeed = 6;
            }
        
        //medium
        } else if (game.settings.difficulty == 2) {
            //green bloon
            if (this.y == 13) {
                this.setTexture(this.bloons[2]);
                this.type = 2;
                this.points = 30;
                this.moveSpeed = 3.5;
            } else if (this.y == borderUISize*3 - 10) {
                //blue bloon
                this.setTexture(this.bloons[1]);
                this.type = 1;
                this.points = 20;
                this.moveSpeed = 3.25; 
            } else{
                //red bloon
                this.setTexture(this.bloons[0]);
                this.type = 0;
                this.points = 10;
                this.moveSpeed = 3; 
            }

        //easy    
        } else {
            if (this.y == 13) {
                //blue bloon
                this.setTexture(this.bloons[1]);
                this.type = 1;
                this.points = 20;
                this.moveSpeed = 3.25;
            } else {
                //red bloon
                this.setTexture(this.bloons[0]);
                this.type = 0;
                this.points = 10;
                this.moveSpeed = 3; 
            }
        }
        this.reset();
    }
}