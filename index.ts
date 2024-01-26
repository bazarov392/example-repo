import { Color, EventsSDK, RendererSDK, Unit, Vector2, Vector3 } from "github.com/octarine-public/wrapper/index"
import { Paths } from "github.com/octarine-public/wrapper/wrapper/Data/ImageData"

const PathParticleTeleport = "particles/items2_fx/teleport_end.vpcf"
EventsSDK.on("GameStarted", () => {
	console.log()
})
// EventsSDK.on("LinearProjectileCreated", tile => console.log("LinearProjectileCreated", tile))

// EventsSDK.on("TrackingProjectileCreated", tile => console.log("TrackingProjectileCreated", tile))

// EventsSDK.on("TrackingProjectileUpdated", tile => console.log("TrackingProjectileUpdated", tile))

EventsSDK.on("Draw", () => {
	const w2sPosition = RendererSDK.WorldToScreen(new Vector3(-1194, -861, 128))
	if (!w2sPosition) {
		return
	}
	// const w2sPosition = RendererSDK.WorldToScreen(new Vector2(-1194, -861))
	// if (!w2sPosition) {
	// 	return
	// }
	// const position = w2sPosition.Subtract(new Vector2(-1194, -861).DivideScalar(2))

	RendererSDK.Image(Paths.Icons.icon_svg_creep, w2sPosition, -1, new Vector2(20, 20), Color.White)
})

EventsSDK.on("ParticleDestroyed", particle => {
	if (particle.Path !== PathParticleTeleport) {
		return
	}
	const ent = particle.ModifiersAttachedTo
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy() && particle.ControlPoints.has(0)) {
		console.log(`${ent.Name_} телепортировался`, particle.ControlPoints.get(0))
	}
})
