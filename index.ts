import { EventsSDK, item_flask, LocalPlayer, TickSleeper } from "github.com/octarine-public/wrapper/index"

class AutoUseFlask {
	public flask: Nullable<item_flask>
	public freeSlot: Nullable<number>
	public isBackpack: boolean = false
}
const AUseFlask = new AutoUseFlask()
const [UseFlaskSleeper] = [new TickSleeper()]

EventsSDK.on("GameStarted", () => {
	console.log("Hello world!")
})

EventsSDK.on("UnitItemsChanged", e => {
	const inv = e.Inventory
	let flask: Nullable<item_flask>
	inv.TotalItems.map((item, index) => {
		console.log("item", item)
		if (item === undefined) {
			if (AUseFlask.freeSlot === undefined && index < 5) {
				AUseFlask.freeSlot = index
			}
		} else if (item instanceof item_flask) {
			flask = item
			AUseFlask.isBackpack = item.ItemSlot >= 6 && item.ItemSlot <= 8
		}
	})

	// const flask = inv.TotalItems.find(i => i instanceof item_flask)
	AUseFlask.flask = flask

	console.log("flask", AUseFlask.flask?.IsHidden)
})

EventsSDK.on("Tick", () => {
	console.log("a", AUseFlask)
	if (UseFlaskSleeper.Sleeping) {
		return false
	}
	const hero = LocalPlayer?.Hero
	if (!hero) {
		return false
	}
	const oneProcentHP = hero.MaxHP / 100

	if (oneProcentHP * 20 >= hero.HP) {
		// UseFlaskSleeper.Sleep(14000)
		if (AUseFlask.flask !== undefined) {
			if (AUseFlask.isBackpack && AUseFlask.freeSlot !== undefined) {
				hero.MoveItem(AUseFlask.flask, AUseFlask.freeSlot)
				UseFlaskSleeper.Sleep(3500)
			} else {
				UseFlaskSleeper.Sleep(14000)
				hero.CastTarget(AUseFlask.flask, hero)
			}
		}
	}
})
