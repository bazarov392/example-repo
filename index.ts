import { EventsSDK, item_flask, LocalPlayer } from "github.com/octarine-public/wrapper/index"

let itemFlask: Nullable<item_flask>

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
	const localHero = LocalPlayer?.Hero
	if (!localHero) {
		return false
	}

	const positions = {
		hero: entity.Position,
		entity: entity.Position
	}

	const distance = Math.sqrt(
		Math.pow(positions.hero.x - positions.entity.x, 2) + Math.pow(positions.hero.y - positions.entity.y, 2)
	)

	console.log("distance", {
		value: distance,
		entity: entity.Name
	})
})
