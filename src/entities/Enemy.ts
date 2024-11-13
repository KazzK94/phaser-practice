
import { Character } from './Character'
import { EnemyHealthBar } from '../ui/EnemyHealthBar'

export class Enemy extends Character {
	// Events
	events: { [key: string]: Function } = {}

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'dragon')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.create()
	}

	create() {
		this.setOrigin(0.5)
		this.setImmovable(true)
		this.setupIdleAnimation()
		this.healthBar = new EnemyHealthBar(this.scene, this.scene.cameras.main.width -210, 10)
		this.setupThrowBombs()
	}

	update() {
		if(this.health <= 0){
			this.healthBar?.destroy()
			this.destroy()
		}
	}

	setupIdleAnimation() {
		const baseVelocity = 50
		let direction = 1
		this.setVelocityY(baseVelocity * direction)
		this.scene.time.addEvent({
			delay: 1000,
			callback: () => {
				if(!this.active) return
				direction *= -1
				this.setVelocityY(baseVelocity * direction)
			},
			startAt: 0,
			loop: true
		})
	}

	setupThrowBombs() {
		this.scene.time.addEvent({
			delay: 600,
			callback: () => {
				if(this.events['fire']){
					this.events['fire'](this.x, this.y, 'left')
				}
			},
			startAt: 0,
			loop: true
		})
	}

	onTrigger(key: string, callback: Function) {
		this.events[key] = callback
	}
}
