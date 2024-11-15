import { SCENE_KEYS } from '../utils/sceneKeys'

export class OptionsScene extends Phaser.Scene {

	constructor() {
		super(SCENE_KEYS.OPTIONS)
	}

	create() {
		this.add.text(100, 100, 'Options', {
			fontSize: '48px'
		})
		this.add.text(100, 200, 'Sorry, this is not implemented yet.\nPlease press F5 to go back to the main menu.', {
			fontSize: '24px'
		})
	}

}
