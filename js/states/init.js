var LD30 = {
	score: 0,
	multiplier: 1,
	fontStyle: { font: "24px Courier", fill: "#000000" },
	transitionPlugin: null
};

LD30.Init = function(game) {

};

LD30.Init.prototype = {

	preload: function() {
		this.load.image('loadBar', 'assets/loading.png');
	},

	create: function() {
		//this.game.scale.pageAlignHorizontally = true;
		//this.game.scale.refresh();

		this.state.start('Preloader');
	}

}