
import { SCENE_KEYS } from '../utils/sceneKeys'

export class VictoryScene extends Phaser.Scene {
	constructor() {
		super(SCENE_KEYS.VICTORY)
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