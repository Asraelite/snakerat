SR.Graphics = class Graphics {
	constructor() {
		this.canvas = document.getElementsByTagName('canvas')[0];
		this.context = this.canvas.getContext('2d');
		this

		window.addEventListener('resize', this.resize.bind(this));
		this.resize();
	}

	resize() {
		let c = this.canvas;
		let ratio = SR.constants.worldWidth / SR.constants.worldHeight;
		c.width = Math.min(window.innerWidth, window.innerHeight * ratio);
		c.height = Math.min(window.innerHeight, window.innerWidth / ratio);
		c.style.width = c.width + 'px';
		c.style.height = c.height + 'px';
	}

	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		let w = SR.game.world;
		let scale = this.canvas.width / w.width;

		this.context.fillStyle = '#f7f7f7';

		for (let x = 0; x <= w.width; x++)
			this.context.fillRect(x * scale | 0, 0, 1, this.canvas.height);
		for (let y = 0; y <= w.height; y++)
			this.context.fillRect(0, y * scale | 0, this.canvas.width, 1);
		this.context.fillRect(this.canvas.width - 1, 0, 1, this.canvas.height);
		this.context.fillRect(0, this.canvas.height - 1, this.canvas.width, 0);

		w.entities.forEach(this.renderEntity.bind(this));
		w.foodPositions.forEach(this.renderFood.bind(this));
		w.snakeTails.forEach(this.renderTail.bind(this));
	}

	renderEntity(entity) {
		let scale = this.canvas.width / SR.game.world.width;

		const sSz = 24;

		let x = entity.x * scale;
		let y = entity.y * scale;

		if (entity.type == 'mouse') {
			let img = SR.assets.mouse;
			let sx = 0 * sSz;
			let sy = 0 * sSz;
			this.context.drawImage(img, sx, sy, sSz, sSz, x, y, scale, scale);
		}

		if (entity.type == 'snake') {
			this.context.fillStyle = '#7e9';
			this.context.fillRect(x, y, scale, scale);
		}
	}

	renderFood(food) {
		let scale = this.canvas.width / SR.game.world.width;
		let x = food.split('.')[0] * scale;
		let y = food.split('.')[1] * scale;
		this.context.drawImage(SR.assets.bourbon, x, y, scale, scale);
	}

	renderTail(tail) {
		let scale = this.canvas.width / SR.game.world.width;
		let x = tail.split('.')[0] * scale;
		let y = tail.split('.')[1] * scale;
		this.context.fillStyle = '#afc';
		this.context.fillRect(x, y, scale, scale);
	}
};
