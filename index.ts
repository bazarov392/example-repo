import {
	EventsSDK,
	item_flask,
	LocalPlayer,
	Notification,
	NotificationsSDK,
	Rectangle
} from "github.com/octarine-public/wrapper/index"

let itemFlask: Nullable<item_flask>

class TestNotification extends Notification {
	public Draw(position: Rectangle): void {
		console.log("asd")
	}
	public OnClick(): boolean {
		return true
	}
}

EventsSDK.on("GameStarted", () => {
	NotificationsSDK.Push(new TestNotification())
})

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

	const onePercentHP = localHero.MaxHP / 100
	const thresholdHP = onePercentHP * 50
	if (thresholdHP >= localHero.HP) {
		if (itemFlask.CanBeCasted() && !localHero.HasBuffByName("modifier_flask_healing")) {
			return localHero.CastTarget(itemFlask, localHero)
		}
	}
})
