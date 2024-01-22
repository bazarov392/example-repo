import { EventsSDK, item_flask, LocalPlayer, TickSleeper } from "github.com/octarine-public/wrapper/index"

class AutoUseFlask {
	public flask: item_flask | null = null
}
const AUseFlask = new AutoUseFlask()
const [UseFlaskSleeper] = [new TickSleeper()]

EventsSDK.on("GameStarted", () => {
	console.log("Hello world!")
})

EventsSDK.on("UnitItemsChanged", e => {
	console.log("change inventory")
	const inv = e.Inventory
	const flask = inv.Items.find(i => i instanceof item_flask)
	AUseFlask.flask = flask ? flask : null
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
			console.log("use flask", new Date())
		}
	}
})
