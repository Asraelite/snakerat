window.addEventListener('load', _ => {
	SR.game = new SR.Game();
	SR.game.init();
});

SR = {};

SR.constants = {
	snakeSpeed: 0.5,
	mouseSpeed: 1,
	worldWidth: 20,
	worldHeight: 20
};

SR.assets = {
	mouse: 'Greedy_Mouse.png',
	bourbon: 'bourbon.png'
};

SR.Game = class Game {
	constructor() {
		this.graphics = new SR.Graphics();
		this.world = new SR.World();

		this.input = {
			mouse: { pressed: {}, held: {} },
			keyCode: { pressed: {}, held: {} },
			key: { pressed: {}, held: {} }
		};

		['keydown', 'keyup', 'mousedown', 'mouseup'].forEach(e => {
			window.addEventListener(e, ((event) => {
				let updateInput = (object, value, pressed) => {
					object.pressed[value] = pressed && !object.held[value];
					object.held[value] = pressed;
				};

				let pressed = ['mousedown', 'keydown'].includes(event.type);
				if (['mousedown', 'mouseup'].includes(event.type)) {
					updateInput(this.input.mouse, event.button, pressed);
				} else {
					updateInput(this.input.keyCode, event.code, pressed);
					updateInput(this.input.key, event.key, pressed);
				}
			}).bind(this));
		});
	}

	init() {
		this.world.spawnPlayer('snake', new SR.Controller('wasd'));
		this.world.spawnPlayer('mouse', new SR.Controller('arrows'));

		let imagesToLoad = 0;

		for (let a in SR.assets) {
			let src = SR.assets[a];
			SR.assets[a] = new Image();
			SR.assets[a].src = src;
			imagesToLoad++;
			SR.assets[a].addEventListener('load', (_ => {
				if (!--imagesToLoad) this.tick();
			}).bind(this));
		}
	}

	tick() {
		this.world.tick();
		this.graphics.render();

		window.requestAnimationFrame(this.tick.bind(this));
	}
};
