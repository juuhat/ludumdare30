LD30.MainMenu = function(game) {
	this.startButton = null;
	this.logo = null;
};

LD30.MainMenu.prototype = {

	preload: function() {	
	},

	create: function() {
		this.stage.backgroundColor = "#503b28";

		this.createBackground();
		this.startButton = this.add.button(296, 200, 'btn_start', this.startGame, this);
		this.add.sprite(210, 80, 'logo');
	},

	update: function() {
	},

	startGame: function() {
		LD30.score = 0;
		LD30.multiplier = 1;
		LD30.transitionPlugin.to('World1');
	},

	createBackground: function() {
		for (var i = 0; i < 7; i++) {
			for (var j = 0; j < 8; j++)  {
				this.add.sprite(this.rnd.integerInRange(100*j, 100*(j+1)), this.rnd.integerInRange(100*i, 100*(i+1)), 'w1_bgStone');
			}
		}
	}

}