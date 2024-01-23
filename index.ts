import { EventsSDK, item_flask, LocalPlayer } from "github.com/octarine-public/wrapper/index"

let itemFlask: Nullable<item_flask>
let lastHP: Nullable<number> = 0

EventsSDK.on("UnitItemsChanged", ent => {
	if (!ent.IsMyHero) {
		return
	}

	const flask = ent.GetItemByClass(item_flask)
	if (flask === undefined) {
		itemFlask = undefined
		return
	}
	return (itemFlask = flask)
})

EventsSDK.on("PostDataUpdate", () => {
	const localHero = LocalPlayer?.Hero
	if (!localHero || !itemFlask) {
		return false
	}
	let hasAttacted = false
	if (lastHP !== undefined) {
		hasAttacted = localHero.HP < lastHP
	}
	lastHP = localHero.HP
	console.log("hasAttacked", hasAttacted)
	const onePercentHP = localHero.MaxHP / 100
	const thresholdHP = onePercentHP * 50
	if (thresholdHP >= localHero.HP) {
		if (itemFlask.CanBeCasted() && !localHero.HasBuffByName("modifier_flask_healing")) {
			localHero.CastTarget(itemFlask, localHero)
		}
	}
})
