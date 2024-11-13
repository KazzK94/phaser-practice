
import { Scene } from 'phaser'
import { SCENE_KEYS } from '../utils/sceneKeys'

export class MainMenuScene extends Scene {
	constructor() {
		super(SCENE_KEYS.MAIN_MENU)
	}

	create() {
		this.add.text(400, 230, 'Deckira I', {
			fontSize: '76px',
			fontStyle: 'bold',
			color: '#fbb',
			fontFamily: 'monospace'
		}).setOrigin(0.5)
		this.add.text(400, 320, 'Press SPACE to continue', {
			fontSize: '24px',
			color: '#fff',
			fontFamily: 'Arial'
		}).setOrigin(0.5)

		this.input.keyboard?.once('keydown-SPACE', () => {
			this.scene.start('Game')
		})

		this.setupGamepad()
	}

	setupGamepad() {
		const gamepad = this.input.gamepad?.getPad(0)
		console.log(gamepad) // This is undefined, even with the controller connected
		/*
		this.input.gamepad.on('connected', function (gamepad, event) {
			console.log({ gamepad, event })
		})
		*/
	}
}