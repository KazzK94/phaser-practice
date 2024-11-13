
interface SceneWithGamepad extends Phaser.Scene {
	pad: Phaser.Input.Gamepad.Gamepad | null
}

export function initGamepad(scene: SceneWithGamepad, onConnect: (pad: Phaser.Input.Gamepad.Gamepad) => void) {
	if (!scene.input.gamepad) return

	if (scene.input.gamepad.total === 0) {
		console.log('waiting for gamepad to connect...')
		scene.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
			console.log('gamepad connected')
			scene.pad = pad
			onConnect(scene.pad)
		})
	} else {
		console.log('pad is connected already')
		scene.pad = scene.input.gamepad.pad1
		onConnect(scene.pad)
	}

}