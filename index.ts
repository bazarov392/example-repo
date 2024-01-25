import { EventsSDK } from "github.com/octarine-public/wrapper/index"

EventsSDK.on("LinearProjectileCreated", tile => console.log("LinearProjectileCreated", tile))

EventsSDK.on("TrackingProjectileCreated", tile => console.log("TrackingProjectileCreated", tile))

EventsSDK.on("EntityCreated", ent => console.log("EntityCreated", ent))

EventsSDK.on("FakeUnitCreated", ent => console.log("FakeUnitCreated", ent))

EventsSDK.on("AbilityCooldownChanged", a => console.log("AbilityCooldownChanged", a))
