LD30.Preloader = function(game) {
	this.loadBar = null;
};

LD30.Preloader.prototype = {

	preload: function() {

		this.loadBar = this.add.sprite(270, 200, 'loadBar');	
		this.load.setPreloadSprite(this.loadBar);

		this.load.image('btn_start', 'assets/startButton.png');
		this.load.image('btn_menu', 'assets/menuButton.png');
		this.load.image('logo', 'assets/logo.png');

		this.load.image('w1_bgStone', 'assets/w1_bgStone.png');
		this.load.image('w1_player', 'assets/stone1.png');
		this.load.image('w1_stone2', 'assets/stone2.png');

		this.load.image('w2_mineral', 'assets/w2_mineral.png');
		this.load.image('w2_sky', 'assets/w2_sky.png');
		this.load.image('w2_rootPoint', 'assets/w2_rootPoint.png');
		this.load.image('w2_plant', 'assets/plant.png');

		this.load.image('w3_player', 'assets/w3_player.png');
		this.load.image('w3_ground', 'assets/w3_ground.png')
		this.load.image('w3_platform', 'assets/w3_platform.png');

		this.load.image('w4_ground', 'assets/w4_ground.png');
		this.load.image('w4_bird', 'assets/w4_bird.png');

		this.load.audio('shoot', 'assets/shoot.wav');
		this.load.audio('jump', 'assets/jump.wav');
		this.load.audio('stoneHit', 'assets/stoneHit.wav');
		this.load.audio('dig', 'assets/dig.wav');

	},

	create: function() {

		LD30.transitionPlugin = this.game.plugins.add(Phaser.Plugin.StateTransition);
		LD30.transitionPlugin.settings({
			duration: 1500,
			ease: Phaser.Easing.Exponential.Out,
			properties: { alpha: 0}
		});

		this.state.start('MainMenu');	
	},

	update: function() {
	}

}