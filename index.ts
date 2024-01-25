import { EventsSDK } from "github.com/octarine-public/wrapper/index"

EventsSDK.on("EntityCreated", ent => {
	console.log(new Date(), ent)
})
