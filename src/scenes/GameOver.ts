
import { Scene } from 'phaser'
import { SCENE_KEYS } from '../utils/sceneKeys'

export class GameOverScene extends Scene {
	constructor() {
		super(SCENE_KEYS.GAME_OVER)
	}

	create() {
		const gameOverText = this.add.text(this.cameras.main.width/2, 250, 'Game Over', 
			{ fontSize: '72px', fontStyle: 'bold', color: '#b44' })
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