import { EventsSDK, item_flask, LocalPlayer, Unit } from "github.com/octarine-public/wrapper/index"
import { Hero } from "github.com/octarine-public/wrapper/wrapper/Objects/Base/Hero"

let itemFlask: Nullable<item_flask>
const originalEnemyHeroes: Hero[] = []
const enemyHeroes: Hero[] = []
let onAttack = false

const clearEnemyHeroes = () => {
	originalEnemyHeroes.clear()
}
EventsSDK.on("GameStarted", clearEnemyHeroes)

EventsSDK.on("GameEnded", clearEnemyHeroes)

EventsSDK.on("Tick", () => {
	const localHero = LocalPlayer?.Hero
	if (!localHero) {
		return
	}
	let c = false
	for (const hero of enemyHeroes) {
		c = hero.Distance2D(localHero) < 500
	}
	onAttack = c
})

EventsSDK.on("UnitItemsChanged", ent => {
	if (ent.IsMyHero) {
		return (itemFlask = ent.GetItemByClass(item_flask))
	}
})

EventsSDK.on("EntityCreated", ent => {
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy()) {
		enemyHeroes.push(ent as Hero)
	}
})

EventsSDK.on("PostDataUpdate", () => {
	const localHero = LocalPlayer?.Hero
	if (!localHero || !itemFlask) {
		return false
	}

	const onePercentHP = localHero.MaxHP / 100
	const thresholdHP = onePercentHP * 50
	if (thresholdHP >= localHero.HP) {
		if (!onAttack && itemFlask.CanBeCasted() && !localHero.HasBuffByName("modifier_flask_healing")) {
			return localHero.CastTarget(itemFlask, localHero)
		}
	}
})

EventsSDK.on("EntityVisibleChanged", () => {
	enemyHeroes.clear()
	enemyHeroes.push(...originalEnemyHeroes.filter(hero => hero.IsValid && hero.IsVisible))
})

// EventsSDK.on('')
