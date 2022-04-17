class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    // load audio
    this.load.audio('sfx_select', './assets/blip_select12.wav');
    this.load.audio('sfx_explosion', './assets/explosion38.wav');
    //this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
  }

  create() {
    //menu text configuration
    let menuConfig = {
      fontFamily: 'luckiest',
      fontSize: '75px',
      color: '#996600',
      align: 'center',
    }
    this.add.text(game.config.width/2, 50, 'Bloons Patrol', menuConfig).setOrigin(0.5);
    let difficultyConfig= {
      fontFamily: 'luckiest',
      fontSize: '50px',
      color: 'white',
      stroke: '#996600',
      strokeThickness: 7,
      align: 'center',
    }

    let easy_button = this.add.text(game.config.width/3 - 75, game.config.height/2 + 50, 'EASY', difficultyConfig).setOrigin(0.5);
    easy_button.setInteractive();
    easy_button.on('pointerover', () => {
      easy_button.setScale(1.3);
    })
    easy_button.on('pointerout', () => {
      easy_button.setScale(1);
    }) 
    easy_button.on('pointerdown', () => {
      game.settings = {
        difficulty: 1,
        gameTimer: 60000    
      }
      this.sound.play('sfx_select');
      this.scene.start("playScene");  
    }) 
    
    let med_button = this.add.text(game.config.width/2, game.config.height/2 + 50, 'MEDIUM', difficultyConfig).setOrigin(0.5);
    med_button.setInteractive();
    med_button.on('pointerover', () => {
      med_button.setScale(1.3);
    })
    med_button.on('pointerout', () => {
      med_button.setScale(1);
    })
    med_button.on('pointerdown', () => {
      game.settings = {
        difficulty: 2,
        gameTimer: 45000    
      }
      this.sound.play('sfx_select');
      this.scene.start("playScene");      
    })
    
    let hard_button = this.add.text(game.config.width*2/3 + 80, game.config.height/2 + 50, 'HARD', difficultyConfig).setOrigin(0.5);
    hard_button.setInteractive();
    hard_button.on('pointerover', () => {
      hard_button.setScale(1.3);
    })
    hard_button.on('pointerout', () => {
      hard_button.setScale(1);
    })
    hard_button.on('pointerdown', () => {
      game.settings = {
        difficulty: 3,
        gameTimer: 45000    
      }
      this.sound.play('sfx_select');
      this.scene.start("playScene");      
    }) 
  }
}