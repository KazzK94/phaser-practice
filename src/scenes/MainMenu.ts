
import { SCENE_KEYS } from '../utils/sceneKeys'
import { handleGamepadButtonPressed, initGamepad } from '../logic/gamepad'

import Phaser from 'phaser'

export class MainMenuScene extends Phaser.Scene {

	private pad: Phaser.Input.Gamepad.Gamepad | null = null
	private menuOptions: { text: string, scene: string, ref?: Phaser.GameObjects.Text }[] = [
		{ text: 'Start', scene: SCENE_KEYS.GAME },
		{ text: 'Options', scene: SCENE_KEYS.OPTIONS },
		{ text: 'Exit', scene: 'EXIT' }
	]
	private optionSelected = 0
	private cursor!: Phaser.GameObjects.Image

	constructor() {
		super(SCENE_KEYS.MAIN_MENU)
	}

	preload() {
		this.load.setPath('assets')
		this.load.image('particle', 'starry-particle.png')
		this.load.image('cursor', 'cursor.png')
	}

	create() {
		this.createTitle()
		this.createOptions()
		this.createCursor()
		this.placeCursor()
		this.createStarryBackground()
		this.setupKeyboard()
		this.setupGamepad()
	}

	update() {
		this.handleGamepad()
	}

	private createTitle() {
		// Add title
		const title = this.add.text(this.cameras.main.centerX, 160, 'Deckira I', {
			fontFamily: 'monospace',
			fontSize: '80px',
			color: '#8A2BE2',
			stroke: '#000000',
			strokeThickness: 6
		})
		title.setOrigin(0.5)
		// Add a glow effect to the title
		title.setTint(0xff00ff, 0xff00ff, 0xaaaa00, 0xffff00)
		// Add floating animation to the title
		this.tweens.add({
			targets: title,
			y: title.y + 20,
			duration: 1500,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut'
		})
	}

	private createOptions() {
		// Add buttons
		this.menuOptions.forEach((option, index) => {
			const optionText = this.add.text(this.cameras.main.width / 2 - 60, 300 + index * 60, option.text, {
				fontFamily: 'Arial',
				fontSize: '32px',
				color: '#ffffff',
				stroke: '#8A2BE2',
				strokeThickness: 2,
				padding: {
					x: 20,
					y: 10
				}
			}).setOrigin(0, 0.5)
			option.ref = optionText
			optionText.on('pointerdown', () => {
				if (option.scene === 'EXIT') {
					this.game.destroy(true)
				} else {
					this.scene.start(option.scene)
				}
			})
		})
	}

	private createCursor() {
		this.cursor = this.add.image(0, 0, 'cursor')
		this.cursor.setOrigin(1, 0.5)
	}

	private placeCursor() {
		const { x, y } = this.menuOptions[this.optionSelected].ref!
		this.cursor.setPosition(x, y)
	}

	private changeOptionSelected(newOption: number) {
		this.optionSelected = newOption
		this.placeCursor()
	}

	private confirmOption() {
		const selectedOption = this.menuOptions[this.optionSelected]
		if (selectedOption.scene === 'EXIT') {
			this.game.destroy(true)
		} else {
			this.scene.start(selectedOption.scene)
		}
	}

	private setupKeyboard() {
		this.input.keyboard?.once('keydown-SPACE', this.confirmOption, this)
		this.input.keyboard?.on('keydown-DOWN', () => {
			this.changeOptionSelected((this.optionSelected + 1) % this.menuOptions.length)
		})
		this.input.keyboard?.on('keydown-UP', () => {
			this.changeOptionSelected((this.optionSelected - 1 + this.menuOptions.length) % this.menuOptions.length)
		})
	}

	private setupGamepad() {
		initGamepad(this, (pad) => {
			this.pad = pad
		})
	}

	private handleGamepad() {
		if (!this.pad) return
		handleGamepadButtonPressed(this.pad, 'down', 'onPressedOnce', () => this.changeOptionSelected((this.optionSelected + 1) % this.menuOptions.length))
		handleGamepadButtonPressed(this.pad, 'up', 'onPressedOnce', () => this.changeOptionSelected((this.optionSelected - 1 + this.menuOptions.length) % this.menuOptions.length))
		handleGamepadButtonPressed(this.pad, 'A', 'onPressedOnce', this.confirmOption, this)
	}

	private createStarryBackground() {
		this.add.particles(0, 0, 'particle', {
			speed: { min: 20, max: 80 },
			angle: { min: 0, max: 360 },
			scale: { start: 0.2, end: 0.4 },
			lifespan: { min: 6000, max: 10000 },
			gravityY: 40,
			frequency: 50,
			tint: [0xf76B92, 0xfA6B9E, 0xf7292, 0xfA6B92],
			emitZone: {
				source: new Phaser.Geom.Rectangle(0, 0, this.cameras.main.width, 0),
				type: 'random',
				quantity: 100
			}
		})
	}

}
