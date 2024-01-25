import { EventsSDK } from "github.com/octarine-public/wrapper/index"

EventsSDK.on("LinearProjectileCreated", tile => {
	console.log(new Date(), tile)
})
