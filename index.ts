import {
	Color,
	EventsSDK,
	item_faerie_fire,
	item_flask,
	LocalPlayer,
	RendererSDK,
	Unit,
	Vector2
} from "github.com/octarine-public/wrapper/index"
import { Hero } from "github.com/octarine-public/wrapper/wrapper/Objects/Base/Hero"

let itemHealing: Nullable<item_flask | item_faerie_fire>
const originalEnemyHeroes: Hero[] = []
const enemyHeroes: Hero[] = []
let onAttack = true

const clearEnemyHeroes = () => {
	originalEnemyHeroes.clear()
}
EventsSDK.on("GameStarted", clearEnemyHeroes)

EventsSDK.on("GameEnded", clearEnemyHeroes)

EventsSDK.on("Draw", () => {
	RendererSDK.Text(`onAttack ${onAttack}`, new Vector2(200, 300), Color.Red, undefined, 28)
})

EventsSDK.on("Tick", () => {
	const localHero = LocalPlayer?.Hero
	if (!localHero) {
		return
	}
	let c = true
	console.log(enemyHeroes)
	for (const hero of enemyHeroes) {
		if (hero.Distance2D(localHero) < hero.BaseAttackRange + 300) {
			c = false
			break
		}
	}
	onAttack = c
})

EventsSDK.on("UnitItemsChanged", ent => {
	if (!ent.IsMyHero) {
		return
	}

	let item = ent.GetItemByClass(item_flask)
	if (!item) {
		item = ent.GetItemByClass(item_faerie_fire)
	}

	itemHealing = item
})

EventsSDK.on("EntityCreated", ent => {
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy()) {
		originalEnemyHeroes.push(ent as Hero)
	}
})

EventsSDK.on("PostDataUpdate", () => {
	const localHero = LocalPlayer?.Hero
	if (!localHero || !itemHealing) {
		return false
	}

	const onePercentHP = localHero.MaxHP / 100
	const thresholdHP = onePercentHP * 50
	if (thresholdHP >= localHero.HP) {
		if (onAttack && itemHealing.CanBeCasted() && !localHero.HasBuffByName("modifier_flask_healing")) {
			return localHero.CastTarget(itemHealing, localHero)
		}
	}
})

EventsSDK.on("EntityVisibleChanged", () => {
	enemyHeroes.clear()
	enemyHeroes.push(...originalEnemyHeroes.filter(hero => hero.IsValid && hero.IsVisible))
})

// EventsSDK.on('')
