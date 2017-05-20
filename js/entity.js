SR.Entity = class Entity {
	constructor(type, settings) {
		this.type = type;
		this._walkCycle = 0;
		this.world = SR.game.world;

		this.x = settings.pos.x;
		this.y = settings.pos.y;

		this.direction = [0, 0];
		this.tailLength = 0;
		this.tails = [];
	}

	tick() {
		if (this.controller)
			this.controller.control();

		if (this.type == 'snake') {
			if (!(this._walkCycle % 6)) {
				this.tails.push(this.posStr);
				this.world.snakeTails.add(this.posStr);
				this.x += this.direction[0];
				this.y += this.direction[1];
				if (this.tails.length > this.tailLength)
					this.world.snakeTails.delete(this.tails.shift());
			}
		}

		if (this.x >= this.world.width) this.x = 0;
		if (this.x < 0) this.x = this.world.width - 1;
		if (this.y >= this.world.height) this.y = 0;
		if (this.y < 0) this.y = this.world.height - 1;

		if (this.world.tileStr(this.posStr) == 'food') {
			this.feed();
			this.world.foodPositions.delete(this.posStr);
		}

		if (this.world.tileStr(this.posStr) == 'tail') {
			this.die();
		}

		this._walkCycle++;
	}

	feed() {
		this.tailLength++;
	}

	die() {
		console.log('dead');
	}

	get posStr() {
		return this.x + '.' + this.y;
	}

	get walkCycle() {
		return this._walkCycle % 4;
	}
}
