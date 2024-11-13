
export class Projectile extends Phaser.Physics.Arcade.Sprite {

	potency: number

	constructor(scene: Phaser.Scene, { potency, sprite, scale }: { potency: number, sprite?: string, scale?: number }) {
		super(scene, -200, -200, sprite || 'star')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.potency = potency
		this.setScale(scale || 1)
	}

	fire(x: number, y: number, direction: string) {
		const toRight = (direction === 'right')
		const baseVelocity = 500
		this.body?.reset(x + (40 * (toRight ? 1 : -1)), y)
		this.setFlipX(!toRight)
		this.setVelocityX(toRight ? baseVelocity : -baseVelocity)
		this.setActive(true)
		this.setVisible(true)
	}

	protected preUpdate(time: number, delta: number): void {
		super.preUpdate(time, delta)

		if (this.x < 0 || this.x > this.scene.cameras.main.width) {
			this.setActive(false)
			this.setVisible(false)
		}
	}
}
