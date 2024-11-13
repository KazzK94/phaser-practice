
import { Character } from './Character'

import { createPlayerAnimations, handlePlayerActions, handlePlayerMovement, setupInputs } from '../logic/player'
import { PlayerHealthBar } from '../ui/PlayerHealthBar'
import { SCENE_KEYS } from '../utils/sceneKeys'
import { initGamepad } from '../logic/gamepad'

/** 
 * A class representing the player. The Player class holds the sprite that the player controls.
 * It also stores the player's health and UI, and handles the player's movement and actions.
 */
export class Player extends Character {
	// Input keys
	wasdKeys!: { [key: string]: Phaser.Input.Keyboard.Key }
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	pad!: Phaser.Input.Gamepad.Gamepad | null | undefined
	
	// Events
	events: { [key: string]: Function } = {}

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'player')
		this.create()
	}

	create() {
		this.setCollideWorldBounds(true)
		this.setScale(2)
		setupInputs(this)
		createPlayerAnimations(this)
		this.pad = initGamepad(this.scene)
		this.healthBar = new PlayerHealthBar(this.scene, 10, 10, this.health)
	}

	update() {
		// Handle player movement based on input (this.cursors, this.wasdKeys)
		handlePlayerMovement(this)
		// Handle all events (stored in this.events)
		handlePlayerActions(this)

		// Check if dead
		if (this.health <= 0) {
			this.scene.scene.start(SCENE_KEYS.GAME_OVER)
		}

	}

	/** Adds a listener to the specified trigger, to run the specified callback */
	onTrigger(key: string, callback: Function) {
		this.events[key] = callback
	}
}