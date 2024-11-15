
import { PlayerHealthBar } from '../ui/PlayerHealthBar'
import { EnemyHealthBar } from '../ui/EnemyHealthBar'

/** A class representing any Character. Needs to be extended from every character in the game. */
export class Character extends Phaser.Physics.Arcade.Sprite {
	// Character's Data
	facing = 'right'
	protected health: number = 100
	// Character's UI
	protected healthBar?: PlayerHealthBar | EnemyHealthBar
	private invulnerable = false

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
		super(scene, x, y, texture)
		scene.add.existing(this)
		scene.physics.add.existing(this)
	}

	/** Deals damage to the character. Returns true if character died or false if character survived. */
	takeDamage(amount: number) {
		if (this.invulnerable) return false

		this.health -= amount
		if (this.healthBar) {
			this.healthBar.update(this.health)
		}
		if (this.health <= 0) {
			return true
		}

		this.setTint(0xff6666)
		this.invulnerable = true
		const invulnerabilityDuration = 180
		const invulnerabilityBlinkRate = invulnerabilityDuration / 3
		this.scene.time.delayedCall(invulnerabilityBlinkRate, () => {
			this.clearTint()
		})
		this.scene.time.delayedCall(invulnerabilityBlinkRate*2, () => {
			this.setTint(0xff6666)
		})
		this.scene.time.delayedCall(invulnerabilityBlinkRate*3, () => {
			this.clearTint()
			this.invulnerable = false
		})
		return false
	}

}