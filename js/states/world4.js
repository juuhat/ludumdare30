LD30.World4 = function(game) {
	this.animal = null;
	this.ground = null;
	this.shotsLeft = null;
	this.fxShoot = null;

	this.gameText = null;
	this.stateText = null;	

};

LD30.World4.prototype = {

	create: function() {

		this.world.setBounds(0, 0, 880, 680);
		this.camera.x = 80;
		this.camera.y = 600;

		document.getElementById("gameBox").style.cursor = "url('assets/crosshair.png'), auto";

		var worldText = this.add.text(275, 100, "HUMAN WORLD", LD30.fontStyle);
		worldText.fixedToCamera = true;
		this.time.events.add(1500, function() {
			this.add.tween(worldText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		}, this);

		this.stage.backgroundColor = "#87ceeb";
		this.ground = this.add.tileSprite(0, 530, 880, 600, 'w4_ground');
		this.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.immovable = true;

		this.shotsLeft = Math.round(12 * LD30.multiplier);

		this.fxShoot = this.add.audio('shoot');

		this.gameText = this.add.text(5, 5, "", LD30.fontStyle);
		this.gameText.fixedToCamera = true;
		this.stateText = this.add.text(510, 5, "", LD30.fontStyle);
		this.stateText.fixedToCamera = true;

		this.input.onDown.add(this.shoot, this);

		this.spawnAnimal();

	},

	update: function() {
		this.gameText.setText("SCORE: " + LD30.score + "\nMULTIPLIER: " + ((LD30.multiplier*100)-100).toFixed(0) + "%");
		this.stateText.setText("SHOTS LEFT: " + this.shotsLeft);

		this.physics.arcade.collide(this.animal, this.ground);

		if (this.animal.body.velocity.x >= 0) {
			this.animal.scale.x = 0.3;
		} else {
			this.animal.scale.x = -0.3;
		}

	},

	animalHit: function() {
		this.animal.destroy();
		LD30.score+=100*LD30.multiplier;
		LD30.multiplier+=0.01;
		this.spawnAnimal();
	},
	
	shoot: function() {
		this.fxShoot.play();
		this.shotsLeft--;

		if (this.shotsLeft <= 0) {
			this.changeWorld();
		}

	},

	spawnAnimal: function() {

		var spawnPlace = this.rnd.integerInRange(1, 3);

		var speed = 340;
		var dir = 1;
		if (!this.math.chanceRoll()) {
			dir = -1;
		}

		if (spawnPlace == 1) {
			this.animal = this.add.sprite(5, this.rnd.integerInRange(5, 200), 'w4_bird');
			this.physics.enable(this.animal, Phaser.Physics.ARCADE);
			this.animal.body.velocity.setTo(speed, dir*speed);
		} else if (spawnPlace == 2) {
			this.animal = this.add.sprite(this.rnd.integerInRange(5, 810), 5, 'w4_bird');
			this.physics.enable(this.animal, Phaser.Physics.ARCADE);
			this.animal.body.velocity.setTo(dir*speed, speed);
		} else {
			this.animal = this.add.sprite(810, this.rnd.integerInRange(5, 200), 'w4_bird');
			this.physics.enable(this.animal, Phaser.Physics.ARCADE);
			this.animal.body.velocity.setTo(-speed, dir*speed);
		}
		this.animal.scale.setTo(0.3, 0.3);
		this.animal.body.collideWorldBounds = true;
		this.animal.body.bounce.setTo(1, 1);
		this.animal.inputEnabled = true;
		this.animal.events.onInputDown.add(this.animalHit, this);

	},

	changeWorld: function() {
		LD30.transitionPlugin.to('GameOver');
	}

}