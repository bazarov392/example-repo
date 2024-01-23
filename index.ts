import {
	Color,
	EventsSDK,
	item_flask,
	LocalPlayer,
	RendererSDK,
	TickSleeper,
	Vector2
} from "github.com/octarine-public/wrapper/index"

let itemFlask: Nullable<item_flask>
let lastHP: Nullable<number> = 0
let hasAttacted = false
const AttackedSleeper = new TickSleeper()

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

EventsSDK.on("Draw", () => {
	RendererSDK.Text(`hasAttacked ${hasAttacted}`, new Vector2(200, 200), Color.Red)
})

EventsSDK.on("PostDataUpdate", () => {
	if (AttackedSleeper.Sleeping) {
		return false
	}

	const localHero = LocalPlayer?.Hero
	if (!localHero || !itemFlask) {
		return false
	}
	if (lastHP === undefined) {
		lastHP = localHero.HP
		return false
	}

	const newStateHasAttacted = lastHP > localHero.HP
	if (newStateHasAttacted === hasAttacted) {
		return false
	}
	AttackedSleeper.Sleep(1000)
	hasAttacted = newStateHasAttacted
	lastHP = localHero.HP
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
			localHero.CastTarget(itemFlask, localHero)
		}
	}
})
