
import { Player } from '../entities/Player'

export function handlePlayerMovement(player: Player) {
	const left = player.cursors.left.isDown || player.wasdKeys.A.isDown
	const right = player.cursors.right.isDown || player.wasdKeys.D.isDown
	const up = player.cursors.up.isDown || player.wasdKeys.W.isDown
	const down = player.cursors.down.isDown || player.wasdKeys.S.isDown

	const baseSpeed = 200
	const velocity = {
		x: baseSpeed * (+right - +left),
		y: baseSpeed * (+down - +up)
	}

	player.setVelocity(velocity.x, velocity.y)

	if (velocity.x < 0) {
		player.facing = 'left'
		player.anims.play('left', true)
	} else if (velocity.x > 0) {
		player.facing = 'right'
		player.anims.play('right', true)
	} else if (velocity.y !== 0) {
		player.anims.play(`${player.facing}`, true)
	} else {
		player.anims.play(`idle-${player.facing}`, true)
	}
}

export function handlePlayerActions(player: Player) {
	if (Phaser.Input.Keyboard.JustDown(player.cursors.space)) {
		if (player.events['fire']) {
			player.events['fire']()
		}
	}
}

export function setupInputs(player: Player) {
	player.wasdKeys = player.scene.input.keyboard!.addKeys('W, A, S, D') as typeof player.wasdKeys
	player.cursors = player.scene.input.keyboard!.createCursorKeys()
}

export function createPlayerAnimations(player: Player) {
	player.anims.create({
		key: 'left',
		frames: player.anims.generateFrameNumbers('player', { frames: [1, 2, 3, 0] }),
		frameRate: 10,
		repeat: -1
	})
	player.anims.create({
		key: 'right',
		frames: player.anims.generateFrameNumbers('player', { frames: [6, 7, 8, 5] }),
		frameRate: 10,
		repeat: -1
	})
	player.anims.create({
		key: 'idle-left',
		frames: [{ key: 'player', frame: 0 }],
		frameRate: 20
	})
	player.anims.create({
		key: 'idle-right',
		frames: [{ key: 'player', frame: 5 }],
		frameRate: 20
	})
}
