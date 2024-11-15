
/** Prepares the gamepad to be registered. 
 * The callback onConnect() will be called when the gamepad is connected, so that the pad can be stored. */
export function initGamepad(scene: Phaser.Scene, onConnect?: (pad: Phaser.Input.Gamepad.Gamepad) => void) {
	if (!scene.input.gamepad) return

	if (scene.input.gamepad.total === 0) {
		console.log('waiting for gamepad to connect...')
		scene.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
			const notificationPosition = {
				x: scene.cameras.main.width - 20,
				y: scene.cameras.main.height - 15
			}
			const notification = scene.add.text(
				notificationPosition.x,
				notificationPosition.y,
				'Gamepad connected',
				{ fontSize: '24px', color: '#00ff00', fontStyle: 'bold' }
			)
			notification.setOrigin(1, 1)
			scene.time.delayedCall(2000, () => notification.destroy())
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

/** Handles the gamepad input. 
 * For PlayStation gamepad, inputs correspond to: X = A, O = B, ⧠ = X, Δ = Y. */
const gamepadButtonsState = {
	A: false, // PS: X
	B: false, // PS: O
	X: false, // PS: ⧠
	Y: false, // PS: Δ
	up: false,
	down: false,
	left: false,
	right: false
}

/**
 * Handles the gamepad button pressed (or released) event.
 * @param pad (Required) The already existing gamepad object.
 * @param buttonKey (Required) The gamepad key to check.
 * @param eventType (Reqquired) The event type to handle (can be 'onDown', 'onUp' or 'onPressedOnce').
 * @param callback (Required) The callback function to be called when the specified event is triggered with the indicated button.
 * @param context (Optional) The context to bind to the callback function.
 */
export function handleGamepadButtonPressed(
	pad: Phaser.Input.Gamepad.Gamepad,
	buttonKey: keyof typeof gamepadButtonsState,
	eventType: 'onDown' | 'onUp' | 'onPressedOnce',
	callback: () => void,
	context?: Phaser.Scene
) {
	if (!pad) return

	let isButtonPressed = false
	switch (buttonKey) {
		case 'left':
			isButtonPressed = pad.left
			break
		case 'right':
			isButtonPressed = pad.right
			break
		case 'up':
			isButtonPressed = pad.up
			break
		case 'down':
			isButtonPressed = pad.down
			break
		case 'A':
			isButtonPressed = pad.A
			break
		case 'B':
			isButtonPressed = pad.B
			break
		case 'X':
			isButtonPressed = pad.X
			break
		case 'Y':
			isButtonPressed = pad.Y
			break
	}

	if (isButtonPressed) {
		(eventType === 'onDown') && callback.bind(context)()
		if (!gamepadButtonsState[buttonKey]) {
			(eventType === 'onPressedOnce') && callback.bind(context)()
		}
		gamepadButtonsState[buttonKey] = true
	} else {
		(eventType === 'onUp') && callback.bind(context)()
		gamepadButtonsState[buttonKey] = false
	}
}