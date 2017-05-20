SR.World = class World {
	constructor() {
		this.width = SR.constants.worldWidth;
		this.height = SR.constants.worldHeight;

		this.entities = new Set();
		this.foodPositions = new Set();
		this.snakeTails = new Set();
	}

	spawnPlayer(type, controller) {
		let entity = new SR.Entity(type, {
			pos: this.randomFreeTile()
		});
		controller.bindEntity(entity);
		this.entities.add(entity);
	}

	tile(x, y) {
		return this.tileStr(x + '.' + y);
	}

	tileStr(str) {
		if (this.foodPositions.has(str)) return 'food';
		if (this.snakeTails.has(str)) return 'tail';
		for (let e of this.entities) if (e.posStr == str) return e;
		return null;
	}

	tick() {
		this.entities.forEach(e => e.tick());

		let foodCount = this.foodPositions.size;
		if (foodCount < 1 || (foodCount < 4 && Math.random() < 0.003)) {
			this.spawnFood();
		}
	}

	spawnFood() {
		let tile = this.randomFreeTile();
		this.foodPositions.add(tile.x + '.' + tile.y);
	}

	randomFreeTile() {
		let tile = true;
		let x, y;
		while (tile) {
			x = (Math.random() * this.width) | 0;
			y = (Math.random() * this.height) | 0;
			tile = this.tile(x, y);
		}
		return { x: x, y: y };
	}
};
