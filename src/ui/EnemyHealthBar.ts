
export class EnemyHealthBar extends Phaser.GameObjects.GameObject {
	private bar: Phaser.GameObjects.Graphics
	private x: number
	private y: number
	private width: number = 200
	private height: number = 20

	constructor(scene: Phaser.Scene, x: number, y: number, healthPercent = 100) {
		super(scene, 'EnemyHealthBar')
		this.bar = scene.add.graphics()
		this.x = x
		this.y = y
		this.draw(healthPercent)
	}

	update(healthPercent: number): void {
		this.draw(healthPercent)
	}

	private draw(healthPercent: number): void {
		this.bar.clear()

		// Draw background
		this.bar.fillStyle(0x660000, 1)
		this.bar.fillRect(this.x, this.y, this.width, this.height)

		// Draw health
		const healthWidth = Math.max(Math.floor(this.width * (healthPercent / 100)), 0)
		this.bar.fillStyle(0xdd0000, 1)
		this.bar.fillRect(this.x, this.y, healthWidth, this.height)

		// Draw border
		this.bar.lineStyle(2, 0x222222)
		this.bar.strokeRect(this.x, this.y, this.width, this.height)
	}

	destroy(): void {
		this.bar.destroy()
	}
}
