import { EventsSDK } from "github.com/octarine-public/wrapper/index"

EventsSDK.on("LinearProjectileCreated", tile => console.log("LinearProjectileCreated", tile))

EventsSDK.on("TrackingProjectileCreated", tile => console.log("TrackingProjectileCreated", tile))
