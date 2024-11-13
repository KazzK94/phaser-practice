
import { PlayerHealthBar } from '../ui/PlayerHealthBar'
import { EnemyHealthBar } from '../ui/EnemyHealthBar'

/** A class representing any Character. Needs to be extended from every character in the game. */
export class Character extends Phaser.Physics.Arcade.Sprite {
	// Character's Data
	facing = 'right'
	protected health: number = 100
	// Character's UI
	protected healthBar?: PlayerHealthBar | EnemyHealthBar

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
		super(scene, x, y, texture)
		scene.add.existing(this)
		scene.physics.add.existing(this)
	}

	/** Deals damage to the character. Returns true if character died or false if character survived. */
	takeDamage(amount: number) {
		this.health -= amount
		if(this.healthBar) {
			this.healthBar.update(this.health)
		}
		if (this.health <= 0) {
			return true
		}
		return false
	}

}