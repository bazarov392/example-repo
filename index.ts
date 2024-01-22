import { EventsSDK, item_flask, LocalPlayer, TickSleeper } from "github.com/octarine-public/wrapper/index"

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

EventsSDK.on("Draw", () => {
	if (UseFlaskSleeper.Sleeping) {
		return false
	}
	const hero = LocalPlayer?.Hero
	if (!hero) {
		return false
	}
	const oneProcentHP = hero.MaxHP / 100

	if (oneProcentHP * 20 >= hero.HP) {
		UseFlaskSleeper.Sleep(140000)
		console.log("use flask", new Date())
	}
})
