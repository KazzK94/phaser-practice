
import { Character } from '../entities/Character'
import { Projectile } from '../entities/Projectile'

export function handleProjectileVsCharacterCollision(obj1: Character | Projectile, obj2: Character | Projectile) {
	let projectile: Projectile | null = null
	let character: Character | null = null
	if (obj1 instanceof Projectile && obj2 instanceof Character) {
		projectile = obj1
		character = obj2
	} else if (obj2 instanceof Projectile && obj1 instanceof Character) {
		projectile = obj2
		character = obj1
	} else {
		return // (this should never happen)
	}
	character.takeDamage(projectile.potency)
	if (projectile) {
		projectile.setActive(false)
		projectile.setVisible(false)
		projectile.destroy()
	}
}
