
import { PlayerHealthBar } from '../ui/PlayerHealthBar'

export class Player {
	private scene: Phaser.Scene
	// Player's Data
	character!: Phaser.Physics.Arcade.Sprite
	private health: number = 100
	private facing = 'right'
	// Player's UI
	private healthBar!: PlayerHealthBar
	// Input keys
	private wasdKeys!: { [key: string]: Phaser.Input.Keyboard.Key }
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	constructor(scene: Phaser.Scene, x: number, y: number) {
		this.scene = scene
		this.character = scene.physics.add.sprite(x, y, 'player')
		this.character.setCollideWorldBounds(true)
		this.character.setScale(2)
		this.setupInputs()
		this.setupAnims()
		this.healthBar = new PlayerHealthBar(scene, 10, 10, this.health)
	}

	update() {
		this.movePlayer()
		if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
			console.log('Fire Projectile') // NOT IMPLEMENTED YET
		}
	}

	movePlayer() {
		const left = this.cursors.left.isDown || this.wasdKeys.A.isDown
		const right = this.cursors.right.isDown || this.wasdKeys.D.isDown
		const up = this.cursors.up.isDown || this.wasdKeys.W.isDown
		const down = this.cursors.down.isDown || this.wasdKeys.S.isDown
		
		const baseSpeed = 200
		const velocity = {
			x: baseSpeed * (+right - +left),
			y: baseSpeed * (+down - +up)
		}

		this.character.setVelocity(velocity.x, velocity.y)

		if (velocity.x < 0) {
			this.facing = 'left'
			this.character.anims.play('left', true)
		} else if (velocity.x > 0) {
			this.facing = 'right'
			this.character.anims.play('right', true)
		} else if (velocity.y !== 0) {
			this.character.anims.play(`${this.facing}`, true)
		} else {
			this.character.anims.play(`idle-${this.facing}`, true)
		}
	}

	/** Deals damage to the player. Returns true if player died, or false if survived. */
	takeDamage(amount: number) {
		this.health -= amount
		this.healthBar.update(this.health)
		if (this.health <= 0) {
			return true
		}
		return false
	}

	setupInputs() {
		this.wasdKeys = this.scene.input.keyboard!.addKeys('W, A, S, D') as typeof this.wasdKeys
		this.cursors = this.scene.input.keyboard!.createCursorKeys()
	}

	setupAnims() {
		this.character.anims.create({
			key: 'left',
			frames: this.character.anims.generateFrameNumbers('player', { frames: [1, 2, 3, 0] }),
			frameRate: 10,
			repeat: -1
		})

		this.character.anims.create({
			key: 'right',
			frames: this.character.anims.generateFrameNumbers('player', { frames: [6, 7, 8, 5] }),
			frameRate: 10,
			repeat: -1
		})

		this.character.anims.create({
			key: 'idle-left',
			frames: [{ key: 'player', frame: 0 }],
			frameRate: 20
		})

		this.character.anims.create({
			key: 'idle-right',
			frames: [{ key: 'player', frame: 5 }],
			frameRate: 20
		})
	}
}