import { Color, EventsSDK, Hero, LocalPlayer, RendererSDK, Vector2 } from "github.com/octarine-public/wrapper/index"

EventsSDK.on("GameStarted", () => {
	console.log("Hello world!")
})
