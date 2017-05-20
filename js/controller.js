SR.Controller = class Controller {
	constructor(type) {
		this.mapping = {
			wasd: {
				up: 'w',
				down: 's',
				left: 'a',
				right: 'd'
			},
			arrows: {
				up: 'ArrowUp',
				down: 'ArrowDown',
				left: 'ArrowLeft',
				right: 'ArrowRight'
			}
		}[type];

		this.cooldown = 0;
	}

	bindEntity(entity) {
		entity.controller = this;
		this.entity = entity;
	}

	control() {
		if (!this.entity)
			throw new Error('Attempt to control null entity');

		if (--this.cooldown > 0) return;

		if (this.entity.type == 'mouse')
			this.controlMouse();

		if (this.entity.type == 'snake')
			this.controlSnake();
	}

	controlMouse() {
		let held = SR.game.input.key.held;

		if (held[this.mapping.up]) {
			this.entity.y -= 1;
			this.cooldown = 4;
		}

		if (held[this.mapping.down]) {
			this.entity.y += 1;
			this.cooldown = 4;
		}

		if (held[this.mapping.left]) {
			this.entity.x -= 1;
			this.cooldown = 4;
		}

		if (held[this.mapping.right]) {
			this.entity.x += 1;
			this.cooldown = 4;
		}
	}

	controlSnake() {
		let held = SR.game.input.key.held;

		if (held[this.mapping.up]) {
			this.entity.direction = [0, -1];
		}

		if (held[this.mapping.down]) {
			this.entity.direction = [0, 1];
		}

		if (held[this.mapping.left]) {
			this.entity.direction = [-1, 0];
		}

		if (held[this.mapping.right]) {
			this.entity.direction = [1, 0];
		}
	}
};
