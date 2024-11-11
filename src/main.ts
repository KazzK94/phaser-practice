
import Phaser, { Types } from 'phaser'
import { MainMenu } from './scenes/MainMenu'
import { GameScene } from './scenes/Game'

import { GameOverScene } from './scenes/GameOver'
import { VictoryScene } from './scenes/Victory'

const config: Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: 'game-container',
	backgroundColor: '#249',
	physics: {
		default: 'arcade',
		arcade: {
			debug: true
		}
	},
	scene: [
		MainMenu,
		GameScene,
		GameOverScene,
		VictoryScene
	]
}

export default new Phaser.Game(config)