
import { Scene } from 'phaser'
import { SCENE_KEYS } from '../utils/sceneKeys'
import { initGamepad } from '../logic/gamepad'

export class MainMenuScene extends Scene {

	pad!: Phaser.Input.Gamepad.Gamepad | null

	private textPressToContinue!: Phaser.GameObjects.Text

	constructor() {
		super(SCENE_KEYS.MAIN_MENU)
		this.pad = null
	}

	create() {
		this.add.text(400, 230, 'Deckira I', {
			fontSize: '76px',
			fontStyle: 'bold',
			color: '#fbb',
			fontFamily: 'monospace'
		}).setOrigin(0.5)
		this.textPressToContinue = this.add.text(400, 320, 'Press SPACE to continue', {
			fontSize: '24px',
			color: '#fff',
			fontFamily: 'Arial'
		}).setOrigin(0.5)

		this.setupKeyboard()
		this.setupGamepad()
	}

	setupKeyboard() {
		this.input.keyboard?.once('keydown-SPACE', this.startGame)
	}

	setupGamepad() {
		initGamepad(this, (pad) => {
			this.textPressToContinue.setText('Press any button in your controller to continue')
			pad.on('down', (_index: number, _value: number) => {
				this.startGame()
			})
		})
	}

	startGame() {
		this.scene.start('Game')
	}
}
