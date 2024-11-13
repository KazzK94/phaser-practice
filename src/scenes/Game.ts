
// Setup
import { Scene } from 'phaser'
import { SCENE_KEYS } from '../utils/sceneKeys'
// Entities
import { Player } from '../entities/Player'
import { Enemy } from '../entities/Enemy'
import { Projectile } from '../entities/Projectile'
import { Character } from '../entities/Character'
// Logic
import { handleProjectileVsCharacterCollision } from '../logic/projectileCollisions'

export class GameScene extends Scene {
	private player!: Player
	private enemy!: Enemy
	private playerProjectiles!: Phaser.Physics.Arcade.Group
	private enemyProjectiles!: Phaser.Physics.Arcade.Group

	constructor() {
		super(SCENE_KEYS.GAME)
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
		this.player = new Player(this, 100, 360)
		this.enemy = new Enemy(this, 620, 280)

		this.playerProjectiles = this.physics.add.group()
		this.enemyProjectiles = this.physics.add.group()

		// Add collision between player and enemy
		this.physics.add.collider(this.player, this.enemy)

		// Add event to fire projectiles
		this.player.onTrigger('fire', () => {
			const projectile = new Projectile(this, {
				potency: Phaser.Math.Between(1, 12)
			})
			if (projectile) {
				this.playerProjectiles.add(projectile)
				projectile.fire(this.player.x, this.player.y, this.player.facing)
			}
		})

		// Add event for enemy to fire projectiles
		this.enemy.onTrigger('fire', (x: number, y: number, direction: string) => {
			if(!this.enemy.active) return
			const projectile = new Projectile(this, {
				potency: Phaser.Math.Between(15, 30),
				sprite: 'bomb',
				scale: 2.5
			})
			if (projectile) {
				this.enemyProjectiles.add(projectile)
				projectile.fire(x, y + Phaser.Math.Between(-120, 120), direction)
			}
		})

		// Add collider between player projectiles and enemy
		this.physics.add.collider(this.playerProjectiles, this.enemy, (obj1, obj2) => {
			handleProjectileVsCharacterCollision(obj1 as Character | Projectile, obj2 as Character | Projectile)
		})

		// Add collider between enemy projectiles and player
		this.physics.add.collider(this.enemyProjectiles, this.player, (obj1, obj2) => {
			handleProjectileVsCharacterCollision(obj1 as Character | Projectile, obj2 as Character | Projectile)
		})
	}

	update() {
		this.player.update()
		this.enemy.update()
	}

}
