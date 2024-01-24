import {
	Entity,
	EventsSDK,
	item_flask,
	LocalPlayer,
	npc_dota_hero_ursa
} from "github.com/octarine-public/wrapper/index"
import { Heroes } from "github.com/octarine-public/wrapper/wrapper/Objects/Base/Hero"

let itemFlask: Nullable<item_flask>
const enemyHeroes: Entity[] = []
EventsSDK.on("GameStarted", () => {
	enemyHeroes.push(...Heroes.filter(hero => hero.IsEnemy(LocalPlayer?.Hero)))
	console.log("enemyHeroes", enemyHeroes)
})

EventsSDK.on("UnitItemsChanged", ent => {
	if (ent.IsMyHero) {
		return (itemFlask = ent.GetItemByClass(item_flask))
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
		if (itemFlask.CanBeCasted() && !localHero.HasBuffByName("modifier_flask_healing")) {
			return localHero.CastTarget(itemFlask, localHero)
		}
	}
})

EventsSDK.on("EntityVisibleChanged", entity => {
	if (!(entity instanceof npc_dota_hero_ursa)) {
		return false
	}

	const localHero = LocalPlayer?.Hero
	if (!localHero) {
		return false
	}
	const positions = {
		hero: localHero.Position,
		entity: entity.Position
	}

	const distance = Math.sqrt(
		Math.pow(positions.hero.x - positions.entity.x, 2) + Math.pow(positions.hero.y - positions.entity.y, 2)
	)

	console.log("distance", distance)
})

// EventsSDK.on('')
