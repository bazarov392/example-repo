import { EventsSDK, InputEventSDK } from "github.com/octarine-public/wrapper/index"

EventsSDK.on("GameStarted", () => {
	console.log("Hello world!")
})

InputEventSDK.on("KeyUp", key => {
	console.log(key)
})
