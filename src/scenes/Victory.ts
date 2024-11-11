
import { Scene } from 'phaser'

export class VictoryScene extends Scene {
	constructor() {
		super('Victory')
	}

	create() {
		const gameOverText = this.add.text(this.cameras.main.width/2, 250, 'You win!!', 
			{ fontSize: '72px', fontStyle: 'bold', color: '#4b4', fontFamily: 'system-ui' })
		gameOverText.setOrigin(0.5)
		this.tweens.add({
			targets: gameOverText,
			y: 280,
			duration: 2000,
			ease: 'Sine.easeInOut',
			yoyo: true,
			loop: -1
		})
	}
}