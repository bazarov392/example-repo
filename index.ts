import { EventsSDK } from "github.com/octarine-public/wrapper/index"

EventsSDK.on("GameStarted", () => {
	console.log()
})
EventsSDK.on("LinearProjectileCreated", tile => console.log("LinearProjectileCreated", tile))

EventsSDK.on("TrackingProjectileCreated", tile => console.log("TrackingProjectileCreated", tile))

EventsSDK.on("EntityCreated", ent => console.log("EntityCreated", ent))

EventsSDK.on("FakeUnitCreated", ent => console.log("FakeUnitCreated", ent))

EventsSDK.on("EntityVisibleChanged", ent => console.log("EntityVisibleChanged", ent))

// EventsSDK.on("AbilityCooldownChanged", a => {
// 	const hero = LocalPlayer?.Hero
// 	if (!hero) {
// 		return
// 	}
// 	console.log("A", a.Distance2D(hero))
// })
