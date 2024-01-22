import { EventsSDK, item_flask } from "github.com/octarine-public/wrapper/index"

EventsSDK.on("GameStarted", () => {
	console.log("Hello world!")
})

EventsSDK.on("UnitItemsChanged", e => {
	const inv = e.Inventory
	const flasks = inv.TotalItems.filter(i => i !== undefined && i !== null && i instanceof item_flask)
	console.log("flasks", flasks)
})
