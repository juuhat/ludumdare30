LD30.World2 = function(game) {
	this.plants = null;
	this.rootPoints = null;
	this.line = null;
	this.currentRoot = null;
	this.movesLeft = null;
	this.endPoint = null;
	this.moveCamera = false;
	this.minerals = null;

	this.roots = null;

	this.gameText = null;
	this.stateText = null;	
	this.fxDig = null;

};

LD30.World2.prototype = {

	create: function() {
		this.world.setBounds(0, 0, 720, 6000);
		this.stage.backgroundColor = "#503b28";

		this.add.sprite(0, 0, 'w2_sky');
		this.fxDig = this.add.audio('dig');

		this.roots = this.add.group();

		var p = this.add.sprite(360, 150-62, 'w2_plant');
		p.anchor.setTo(0.5, 0.5);

		var worldText = this.add.text(275, 100, "PLANT WORLD", LD30.fontStyle);
		worldText.fixedToCamera = true;
		this.time.events.add(1500, function() {
			this.add.tween(worldText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		}, this);

		this.minerals = this.add.group();

		this.line = this.add.graphics(0, 0);

		this.rootPoints = [];
		this.rootPoints.push(new Phaser.Point(360, 150));
		this.currentRoot = this.rootPoints[0];

		this.input.onDown.add(this.addRoot, this);

		this.gameText = this.add.text(5, 5, "", LD30.fontStyle);
		this.gameText.fixedToCamera = true;
		this.stateText = this.add.text(510, 5, "", LD30.fontStyle);
		this.stateText.fixedToCamera = true;

		this.movesLeft = 40;

		this.spawnMinerals();

	},

	update: function() {

		this.gameText.setText("SCORE: " + LD30.score + "\nMULTIPLIER: " + ((LD30.multiplier*100)-100).toFixed(0) + "%");
		this.stateText.setText("MOVES LEFT: " + this.movesLeft);

		this.physics.arcade.overlap(this.roots, this.minerals, this.rootMineralOverlap, null, this);

		this.endPoint = this.calcEndPoint();
		this.drawLine();

		if (this.moveCamera) {
			this.moveCamera = false;
			this.add.tween(this.camera).to({y: this.currentRoot.y-150}, 750, Phaser.Easing.Quadratic.InOut, true);
		}

	},

	drawLine: function() {
		this.line.destroy(true);
		this.line = this.add.graphics(0, 0);
		this.line.lineStyle(10, 0xFFA500, 1); //width, color, alpha
		this.line.beginFill(0xFFA500, 1);
		this.line.moveTo(this.currentRoot.x, this.currentRoot.y);
		this.line.lineTo(this.endPoint.x, this.endPoint.y);
		this.line.endFill();
	},

	drawRoot: function(start, end) {

		var root = this.add.graphics(0,0);
		root.lineStyle(8, 0xC3A253, 1);
		root.moveTo(start.x, start.y);
		root.lineTo(end.x, end.y);

		var sr = this.roots.create(start.x, start.y, 'w2_rootPoint');
		sr.anchor.setTo(0.5, 0.5);
		sr.alpha = 0;
		sr.scale.setTo(2.5, 2.5);
		this.physics.enable(sr, Phaser.Physics.ARCADE);

	},

	rootMineralOverlap: function(root, mineral) {
		mineral.destroy();
		LD30.score+=100*LD30.multiplier;
		LD30.multiplier+=0.01;
	},

	addRoot: function() {
		this.rootPoints.push(new Phaser.Point(this.endPoint.x, this.endPoint.y));
		this.currentRoot = this.rootPoints[this.rootPoints.length-1];
		this.moveCamera = true;
		this.drawRoot(this.rootPoints[this.rootPoints.length-1], this.rootPoints[this.rootPoints.length-2]);
		
		var r = this.add.sprite(this.currentRoot.x, this.currentRoot.y, 'w2_rootPoint');
		r.anchor.setTo(0.5, 0.5);
		r.scale.setTo(0.6, 0.6);

		this.fxDig.play();

		this.movesLeft--;
		if (this.movesLeft <= 0) {
			this.changeWorld();
		}

	},

	calcEndPoint: function() {
		var v = new Phaser.Point(this.input.worldX - this.currentRoot.x, this.input.worldY - this.currentRoot.y);
		var length = v.getMagnitude();
		v = new Phaser.Point(v.x/length, v.y/length);

		if (v.y < 0) {
			v.y = 0;
		}

		v = new Phaser.Point((v.x*80)+this.currentRoot.x, (v.y*80)+this.currentRoot.y);
		return v;
	},

	changeWorld: function() {
		this.camera.reset();
		LD30.transitionPlugin.to('World3');
	},

	spawnMinerals: function() {
		var mul = 1-(LD30.multiplier-1);
		for (var i = 0; i < 50; i++) {
			var m = this.minerals.create(this.rnd.integerInRange(20, 700), 200+i*64*mul, 'w2_mineral');
			this.physics.enable(m, Phaser.Physics.ARCADE);
			m.scale.setTo(0.6, 0.6);
		}
	}

}