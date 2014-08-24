LD30.World3 = function(game) {
	this.player = null;
	this.platforms = null;
	this.grass = null;
	this.gameTimer = null;
	this.move = null;
	this.jumpFX = null;

	this.gameText = null;
	this.stateText = null;	

};

LD30.World3.prototype = {

	create: function() {

		this.stage.backgroundColor = "#87ceeb";

		this.world.setBounds(0, 0, 720, 600);

		this.jumpFX = this.add.audio('jump');

		var worldText = this.add.text(275, 100, "ANIMAL WORLD", LD30.fontStyle);
		worldText.fixedToCamera = true;
		this.time.events.add(1500, function() {
			this.add.tween(worldText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		}, this);

		this.platforms = this.add.group();
		this.platforms.enableBody = true;
		this.platforms.physicsBodyType = Phaser.Physics.ARCADE;
		
		this.platforms.create(0,560,'w3_ground');
		this.platforms.create(100, 400, 'w3_platform');
		this.platforms.create(440, 240, 'w3_platform');

		this.platforms.forEach(function(e) {
			e.body.immovable = true;
		});

		this.grass = this.add.group();

		this.player = this.add.sprite(80, 500, 'w3_player');
		this.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.gravity.y = 1000;
		this.player.scale.setTo(0.5, 0.5);
		this.player.anchor.setTo(0.5, 0.5);
		//this.player.body.collideWorldBounds = true; //???bugs player physics if set here

		this.gameText = this.add.text(5, 5, "", LD30.fontStyle);
		this.gameText.fixedToCamera = true;
		this.stateText = this.add.text(510, 5, "", LD30.fontStyle);
		this.stateText.fixedToCamera = true;

		var grassSpawnTimer = this.time.create(false);
		var mul = 1-(LD30.multiplier-1);
		console.log(mul);
		grassSpawnTimer.loop(2400*mul, this.spawnGrass, this);
		grassSpawnTimer.start();

		this.gameTimer = this.time.create(false);
		this.gameTimer.loop(30000, this.changeWorld, this);
		this.gameTimer.start();

		this.move = 100;

	},

	update: function() {

		this.gameText.setText("SCORE: " + LD30.score + "\nMULTIPLIER: " + ((LD30.multiplier*100)-100).toFixed(0) + "%");
		this.stateText.setText("TIME: " + (this.gameTimer.duration/1000).toFixed(1));

		this.player.body.collideWorldBounds = true;

		this.player.body.velocity.x = 0;

		this.physics.arcade.collide(this.player, this.platforms, this.collisionPlatform, null, this);
		this.physics.arcade.overlap(this.player, this.grass, this.collisionGrass, null, this);

		if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
			this.player.body.velocity.x += -300;
			this.player.scale.x = -0.5;
		} else if (this.input.keyboard.isDown(Phaser.Keyboard.D)) {
			this.player.body.velocity.x += 300;
			this.player.scale.x = 0.5;
		}

		if (this.input.keyboard.isDown(Phaser.Keyboard.W) && this.player.body.touching.down || this.player.body.onGround) {
			this.player.body.velocity.y += -600;
			this.jumpFX.play();
		}
	},

	collisionPlatform: function() {
	},

	collisionGrass: function(pla, grass) {
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			LD30.score += 100*LD30.multiplier;
			LD30.multiplier+=0.01;
			grass.destroy();
		}
		
	},

	spawnGrass: function() {

		var lvl = this.rnd.integerInRange(1, 3);
		var plant;

		if (lvl == 1) {
			plant = this.grass.create(this.rnd.integerInRange(40, 700), 530, 'w2_plant');
		} else if (lvl == 2) {
			plant = this.grass.create(this.rnd.integerInRange(140, 325), 370, 'w2_plant');
		} else {
			plant = this.grass.create(this.rnd.integerInRange(480, 671), 210, 'w2_plant');
		}

		plant.scale.setTo(0.5, 0.5);
		plant.anchor.setTo(1, 0.5);
		this.physics.enable(plant, Phaser.Physics.ARCADE);
	},

	changeWorld: function() {
		LD30.transitionPlugin.to('World4');
	}

}