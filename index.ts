import {
	EventsSDK,
	item_flask,
	npc_dota_hero_night_stalker,
	TickSleeper
} from "github.com/octarine-public/wrapper/index"

class AutoUseFlask {
	public flasks: item_flask[] = []
}
const AUseFlask = new AutoUseFlask()
const [UseFlaskSleeper] = [new TickSleeper()]

EventsSDK.on("GameStarted", () => {
	console.log("Hello world!")
})

EventsSDK.on("UnitItemsChanged", e => {
	const inv = e.Inventory
	const flasks = inv.TotalItems.filter(i => i !== undefined && i !== null && i instanceof item_flask) as item_flask[]
	AUseFlask.flasks = flasks
})

EventsSDK.on("UnitStateChanged", e => {
	if (e instanceof npc_dota_hero_night_stalker) {
		console.log(e)
	}
})
