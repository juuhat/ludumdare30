LD30.GameOver = function(game) {
	this.menuButton = null;
	this.resultsText = null;
};

LD30.GameOver.prototype = {

	create: function() {
		this.add.tileSprite(-40, 450, 880, 600, 'w4_ground');
		document.getElementById("gameBox").style.cursor = 'auto';

		this.add.button(296, 300, 'btn_menu', this.returnToMenu, this);

		this.resultsText = this.add.text(250, 50, "GAME OVER\n\nSCORE: " + LD30.score + "\nMULTIPLIER: " + ((LD30.multiplier*100)-100).toFixed(0) + "%", LD30.fontStyle);

	},

	update: function() {
	},

	returnToMenu: function() {
		this.state.start('MainMenu');
	}

}