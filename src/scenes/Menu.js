class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.image('player1', './assets/move1.png');
    this.load.image('player2', './assets/move2.png');
    // load audio
    this.load.audio('sfx_select', './assets/blip_select12.wav');
    this.load.audio('sfx_explosion', './assets/bloon pop.wav');
    //this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
  }

  create() {
    game.settings = {
      players: 1,
      difficulty: 1,
      gameTimer: 60000     
    }
    //menu text configuration
    let menuConfig = {
      fontFamily: 'luckiest',
      fontSize: '75px',
      color: '#996600',
      align: 'center',
    }

    let playerConfig = {
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

    this.p1move = this.add.tileSprite(-10, 100, 200, 200, 'player1').setOrigin(0, 0);
    this.p2move = this.add.tileSprite(game.config.width - 190, 100, 200, 200, 'player2').setOrigin(0, 0);
    this.p2move.alpha = 0;

    let player = this.add.text(game.config.width/2, game.config.height/2 - 50, game.settings.players + ' Player', difficultyConfig).setOrigin(0.5);
    player.setInteractive();
    player.on('pointerover', () => {
      player.setScale(1.3);
    })
    player.on('pointerout', () => {
      player.setScale(1);
    }) 
    player.on('pointerdown', () => {
      if (game.settings.players == 1) {
        game.settings.players = 2;
        this.p2move.alpha = 1;
        player.text = game.settings.players + ' Players';
      } else {
        game.settings.players = 1;
        this.p2move.alpha = 0;
        player.text = game.settings.players + ' Player';
      }
      this.sound.play('sfx_select');
    })

    let easy_button = this.add.text(game.config.width/3 - 75, game.config.height/2 + 50, 'EASY', difficultyConfig).setOrigin(0.5);
    easy_button.setInteractive();
    easy_button.on('pointerover', () => {
      easy_button.setScale(1.3);
    })
    easy_button.on('pointerout', () => {
      easy_button.setScale(1);
    }) 
    easy_button.on('pointerdown', () => {
      game.settings.difficulty = 1;
      game.settings.gameTimer = 60000;
      easy_button.alpha = 1;
      med_button.alpha = 0.7;
      hard_button.alpha = 0.7;
      this.sound.play('sfx_select');  
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
      game.settings.difficulty = 2;
      game.settings.gameTimer = 45000;
      easy_button.alpha = 0.7;
      med_button.alpha = 1;
      hard_button.alpha = 0.7;
      this.sound.play('sfx_select');     
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
      game.settings.difficulty = 3;
      game.settings.gameTimer = 45000;
      easy_button.alpha = 0.7;
      med_button.alpha = 0.7;
      hard_button.alpha = 1;
      this.sound.play('sfx_select');      
    })
    easy_button.alpha = 1;
    med_button.alpha = 0.7;
    hard_button.alpha = 0.7;
    
    let confirm = this.add.text(game.config.width/2, game.config.height*4/5, 'CONFIRM', difficultyConfig).setOrigin(0.5);
    confirm.setInteractive();
    confirm.on('pointerover', () => {
      confirm.setScale(1.3);
    })
    confirm.on('pointerout', () => {
      confirm.setScale(1);
    })
    confirm.on('pointerdown', () => {
      this.sound.play('sfx_select');
      this.scene.start("playScene");      
    })
  }
}