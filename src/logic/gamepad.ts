
export function initGamepad(scene: Phaser.Scene, onConnect?: (pad: Phaser.Input.Gamepad.Gamepad) => void) {
	if (!scene.input.gamepad) return

	if (scene.input.gamepad.total === 0) {
		console.log('waiting for gamepad to connect...')
		scene.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
			console.log('gamepad connected')
			onConnect && onConnect(pad)
			return pad
		})
	} else {
		console.log('pad is connected already')
		onConnect && onConnect(scene.input.gamepad.gamepads[0])
		return scene.input.gamepad.gamepads[0]
	}
}