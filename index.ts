import { Color, EventsSDK, Hero, LocalPlayer, RendererSDK, Vector2 } from "github.com/octarine-public/wrapper/index"

EventsSDK.on("GameStarted", () => {
	console.log("Hello world!")
})
EventsSDK.on('Draw', () => {
	RendererSDK.FilledRect(new Vector2(200, 200), new Vector2(200, 200), Color.Orange);
});
