
import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { Enemy } from '../entities/Enemy'
import { SCENE_KEYS } from '../utils/sceneKeys'

export class GameScene extends Scene {

	private player!: Player
	private enemy!: Enemy

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
		this.player = new Player(this, 100, 450)
		this.enemy = new Enemy(this, 620, 280)

		// Add collision between player and enemy
		// (SHOULD I DO IT LIKE THIS?)
		this.physics.add.collider(this.player.character, this.enemy.character)
	}

	update() {
		this.player.update()
	}

}
