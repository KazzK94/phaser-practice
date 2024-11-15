
import Phaser, { Types } from 'phaser'

// Scenes
import { MainMenuScene } from './scenes/MainMenu'
import { GameScene } from './scenes/Game'
import { VictoryScene } from './scenes/Victory'
import { GameOverScene } from './scenes/GameOver'
import { OptionsScene } from './scenes/Options'

const config: Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: 'game-container',
	backgroundColor: '#249',
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	input: {
		gamepad: true
	},
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH,
		zoom: 2
	},
	scene: [
		MainMenuScene,
		GameScene,
		VictoryScene,
		GameOverScene,
		OptionsScene
	]
}

new Phaser.Game(config)