
export class Enemy {
	// Enemy's Data
	character!: Phaser.Physics.Arcade.Sprite
	// private health: number = 100

	constructor(scene: Phaser.Scene, x: number, y: number) {
		this.character = scene.physics.add.sprite(x, y, 'dragon')
		this.character.setOrigin(0.5)
		this.character.setImmovable(true)

		this.setupIdleAnimation(scene)
		this.setupProjectilesLoop(scene)
	}

	setupIdleAnimation(scene: Phaser.Scene) {
		const baseVelo = 50
		let direction = 1
		this.character.setVelocityY(baseVelo * direction)
		scene.time.addEvent({
			delay: 1000,
			callback: () => {
				direction *= -1
				this.character.setVelocityY(baseVelo * direction)
			},
			startAt: 0,
			loop: true
		})
	}

	setupProjectilesLoop(scene: Phaser.Scene) {

		// make the enemy projectiles
		scene.time.addEvent({
			delay: 600,
			callback: () => {
				const verticalVariation = Phaser.Math.Between(-80, 80)
				// TODO: Handle with a Projectiles Pool
				const projectile = scene.physics.add.sprite(this.character.x - 40, this.character.y + verticalVariation, 'bomb')
				projectile.setScale(3)
				projectile.setVelocityX(-300)
				/*
				scene.physics.add.collider(scene.player, projectile, () => {
					projectile.destroy()
					scene.takeDamage(10)
				})
				*/
				// When out of bounds destroy
				if (projectile.x < 0) {
					projectile.destroy()
				}
			},
			loop: true
		})
	}

}
