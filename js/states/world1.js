LD30.World1 = function(game) {
	this.player = null;
	this.playerSpeed = null;
	this.stones = null;
	this.particles = null;
	this.fxHit = null;
	this.gameTimer = null;

	this.gameText = null;
	this.stateText = null;
};

LD30.World1.prototype = {

	create: function() {

		this.world.setBounds(0, 0, 2000, 1760);

		this.stage.backgroundColor = "#503b28";
		this.createBackground();

		this.gameText = this.add.text(5, 5, "SCORE: ", LD30.fontStyle);
		this.gameText.fixedToCamera = true;
		this.stateText = this.add.text(550, 5, "TIME: ", LD30.fontStyle);
		this.stateText.fixedToCamera = true;

		var worldText = this.add.text(275, 100, "MINERAL WORLD", LD30.fontStyle);
		worldText.fixedToCamera = true;
		this.time.events.add(1500, function() {
			this.add.tween(worldText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		}, this);

		this.stones = this.add.group();

		this.player = this.add.sprite(100, 100, 'w1_player');
		this.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.collideWorldBounds = true;
		this.playerSpeed = 8;

		this.camera.follow(this.player);

		this.particles = this.add.emitter(this, 1000, 1000, 50);
		this.particles.makeParticles('w2_mineral');

		this.fxHit = this.add.audio('stoneHit');

		for (var i = 0; i < 30; i++) {
			this.addStone();
		}

		this.gameTimer = this.time.create(false);
		this.gameTimer.loop(30000, this.changeWorld, this);
		this.gameTimer.start();

	},

	update: function() {

		this.gameText.setText("SCORE: " + LD30.score + "\nMULTIPLIER: " + ((LD30.multiplier*100)-100).toFixed(0) + "%");
		this.stateText.setText("TIME: " + (this.gameTimer.duration/1000).toFixed(1));

		this.physics.arcade.collide(this.player, this.stones, this.collisionHandler, null, this);

		if (this.input.keyboard.isDown(Phaser.Keyboard.D)) {
			this.player.body.velocity.x += this.playerSpeed;
		} else if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
			this.player.body.velocity.x -= this.playerSpeed;
		} 

		if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
			this.player.body.velocity.y += this.playerSpeed;
		} else if (this.input.keyboard.isDown(Phaser.Keyboard.W)) {
			this.player.body.velocity.y -= this.playerSpeed;
		}

	},

	collisionHandler: function(player, stone) {
		
		this.particles.x = stone.body.x;
		this.particles.y = stone.body.y;
		this.particles.start(true, 1000, null, 6);

		//this.player.scale.x += 0.1;
		//this.player.scale.y += 0.1;
		stone.destroy();
		LD30.score+=100*LD30.multiplier;
		LD30.multiplier+=0.01;
		this.fxHit.play();
	},

	createBackground: function() {
		for (var i = 0; i < 20; i++) {
			for (var j = 0; j < 20; j++)  {
				this.add.sprite(this.rnd.integerInRange(100*j, 100*(j+1)), this.rnd.integerInRange(100*i, 100*(i+1)), 'w1_bgStone');
			}
		}
	},

	addStone: function() {
		var s = this.stones.create(this.rnd.integerInRange(50, 1800), this.rnd.integerInRange(50, 1500), 'w1_stone2');
		this.physics.enable(s, Phaser.Physics.ARCADE);
		s.body.velocity.setTo(this.rnd.integerInRange(-200, 200), this.rnd.integerInRange(-200, 200));
		s.body.collideWorldBounds = true;
		s.body.bounce.setTo(1, 1);
	},

	changeWorld: function() {
		LD30.transitionPlugin.to('World2');
	}

}