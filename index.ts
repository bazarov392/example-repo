import { EventsSDK, item_flask, LocalPlayer, TickSleeper } from "github.com/octarine-public/wrapper/index"

class AutoUseFlask {
	public flask: Nullable<item_flask>
}
const AUseFlask = new AutoUseFlask()
const [UseFlaskSleeper] = [new TickSleeper()]

EventsSDK.on("GameStarted", () => {
	console.log("Hello world!")
})

EventsSDK.on("UnitItemsChanged", e => {
	const inv = e.Inventory
	AUseFlask.flask = inv.TotalItems.find(i => i instanceof item_flask)
	console.log("flask", AUseFlask.flask?.IsHidden)
})

EventsSDK.on("Tick", () => {
	if (UseFlaskSleeper.Sleeping) {
		return false
	}
	const hero = LocalPlayer?.Hero
	if (!hero) {
		return false
	}
	const oneProcentHP = hero.MaxHP / 100

	if (oneProcentHP * 20 >= hero.HP) {
		UseFlaskSleeper.Sleep(14000)
		if (AUseFlask.flask) {
			hero.CastTarget(AUseFlask.flask, hero)
		}
	}
})
