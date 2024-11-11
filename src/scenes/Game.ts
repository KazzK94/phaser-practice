
import { Scene } from 'phaser'

const PLAYER_BASE_SPEED = 200

export class GameScene extends Scene {

	player!: Phaser.Physics.Arcade.Sprite
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	letters!: {
		W: Phaser.Input.Keyboard.Key,
		A: Phaser.Input.Keyboard.Key,
		S: Phaser.Input.Keyboard.Key,
		D: Phaser.Input.Keyboard.Key
	}
	facing = 'right'
	projectiles!: ProjectilesGroup

	playerHp = 100
	enemyHp = 100

	constructor() {
		super('Game')
	}

	preload() {
		this.load.setPath('assets')
		this.load.image('star', 'star.png')
		this.load.image('bomb', 'bomb.png')
		this.load.image('dragon', 'dragon.webp')
		this.load.spritesheet('player', 'dude.png',
			{ frameWidth: 32, frameHeight: 48 }
		)
	}

	create() {
		this.projectiles = new ProjectilesGroup(this)
		this.setupPlayer()
		this.setupControls()
		this.setupEnemy()
		this.setupUI()
	}

	update() {
		this.movePlayer()
		this.handleShoot()
	}

	setupPlayer() {
		this.player = this.physics.add.sprite(200, 360, 'player')
		this.player.setCollideWorldBounds(true)
		this.player.setScale(2)
		this.player.setBounce(0.2)
		// Setup animations for the player
		this.setupAnims()
	}

	setupAnims() {
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('player', { frames: [1, 2, 3, 0] }),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('player', { frames: [6, 7, 8, 5] }),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'idle-left',
			frames: [{ key: 'player', frame: 0 }],
			frameRate: 20
		})

		this.anims.create({
			key: 'idle-right',
			frames: [{ key: 'player', frame: 5 }],
			frameRate: 20
		})
	}

	setupControls() {
		this.cursors = this.input.keyboard!.createCursorKeys()
		this.letters = {
			W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		}
	}

	setupEnemy() {
		const enemy = this.physics.add.sprite(620, 280, 'dragon')
		enemy.setOrigin(0.5)
		enemy.setImmovable(true)
		// Tween the enemy to move up and down slightly forever (idle "animation")
		this.tweens.add({
			targets: enemy,
			y: enemy.y + 40,
			duration: 1000,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut'
		})
		// Add collision between projectiles and enemy
		this.physics.add.overlap(this.projectiles, enemy, (_enemy, projectile) => {
			projectile.destroy()
			this.enemyHp -= 5
			if (this.enemyHp <= 0) {
				this.scene.start('Victory')
			}
		}, undefined, this)

		// Make player take damage when colliding with enemy
		this.physics.add.collider(this.player, enemy)

		// make the enemy shoot a projectile sometimes
		this.time.addEvent({
			delay: 600,
			callback: () => {
				const verticalVariation = Phaser.Math.Between(-80, 80)
				const projectile = this.physics.add.sprite(enemy.x - 40, enemy.y + verticalVariation, 'bomb')
				projectile.setScale(3)
				projectile.setVelocityX(-300)
				this.physics.add.collider(this.player, projectile, () => {
					projectile.destroy()
					this.takeDamage(10)
				})
				// When out of bounds destroy
				if (projectile.x < 0) {
					projectile.destroy()
				}
			},
			loop: true
		})
	}

	setupUI() {
		// Show player HP as a rectangle in top left (green part is HP, background is black)
		const playerHpBar = this.add.graphics()
		playerHpBar.fillStyle(0x440000)
		playerHpBar.fillRect(10, 10, 200, 30)
		const playerHpBarFill = this.add.graphics()
		playerHpBarFill.fillStyle(0x00ff00)
		playerHpBarFill.fillRect(12, 12, 200 - 4, 30 - 4)
		this.events.on('update', () => {
			playerHpBarFill.clear()
			playerHpBarFill.fillStyle(0x00ff00)
			playerHpBarFill.fillRect(12, 12, 200 * (this.playerHp / 100) - 4, 30 - 4)
		})

		// Show enemy HP as a rectangle in top right (red part is HP, background is black)
		const enemyHpBar = this.add.graphics()
		enemyHpBar.fillStyle(0x440000)
		enemyHpBar.fillRect(590, 10, 200, 30)
		const enemyHpBarFill = this.add.graphics()
		enemyHpBarFill.fillStyle(0xff0000)
		enemyHpBarFill.fillRect(590 + 2, 12, 200 - 4, 30 - 4)
		this.events.on('update', () => {
			enemyHpBarFill.clear()
			enemyHpBarFill.fillStyle(0xff0000)
			enemyHpBarFill.fillRect(590 + 2, 12, 200 * (this.enemyHp / 100) - 4, 30 - 4)
		})
	}

	movePlayer() {
		const velocity = {
			x: 0,
			y: 0
		}
		this.player.setVelocity(0)

		if (this.cursors.left.isDown || this.letters.A.isDown) {
			velocity.x -= PLAYER_BASE_SPEED
		}
		if (this.cursors.right.isDown || this.letters.D.isDown) {
			velocity.x += PLAYER_BASE_SPEED
		}

		if (this.cursors.up.isDown || this.letters.W.isDown) {
			velocity.y -= PLAYER_BASE_SPEED
		}
		if (this.cursors.down.isDown || this.letters.S.isDown) {
			velocity.y += PLAYER_BASE_SPEED
		}

		this.player.setVelocity(velocity.x, velocity.y)

		if (velocity.x < 0) {
			this.facing = 'left'
			this.player.anims.play('left', true)
		} else if (velocity.x > 0) {
			this.facing = 'right'
			this.player.anims.play('right', true)
		} else if (velocity.y !== 0) {
			this.player.anims.play(`${this.facing}`, true)
		} else {
			this.player.anims.play(`idle-${this.facing}`, true)
		}
	}

	handleShoot() {
		const space = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
		if (Phaser.Input.Keyboard.JustDown(space!)) {
			this.projectiles.fireProjectile(this.player.x, this.player.y, this.facing)
		}
	}

	takeDamage(amount: number) {
		this.playerHp -= amount
		if (this.playerHp <= 0) {
			this.scene.start('GameOver')
		}
	}
}


class Projectile extends Phaser.Physics.Arcade.Sprite {
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'star')
	}

	fire(x: number, y: number, direction: string) {
		const toRight = direction === 'right'
		this.body?.reset(x + (40 * (toRight ? 1 : -1)), y)
		this.setActive(true)
		this.setVisible(true)
		this.setVelocityX(500 * (toRight ? 1 : -1))
		this.setFlipX(!toRight)
	}

	protected preUpdate(time: number, delta: number): void {
		super.preUpdate(time, delta)

		if (this.x < 0 || this.x > this.scene.cameras.main.width) {
			this.setActive(false)
			this.setVisible(false)
		}
	}
}

class ProjectilesGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene: Phaser.Scene) {
		super(scene.physics.world, scene)

		// When ProjectilesGroup is instanced, create 10 projectiles in the pool
		this.createMultiple({
			classType: Projectile,
			frameQuantity: 30,
			active: false,
			visible: false,
			key: 'star',
			setScale: { x: 1.2, y: 1.2 }
		})
	}

	fireProjectile(x: number, y: number, direction: string) {
		const projectile = this.getFirstDead(false)
		if (projectile) {
			projectile.fire(x, y, direction)
		}
	}
}