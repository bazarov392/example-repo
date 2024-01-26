import { EventsSDK, RendererSDK, Unit, Vector2 } from "github.com/octarine-public/wrapper/index"
import { Paths } from "github.com/octarine-public/wrapper/wrapper/Data/ImageData"

const PathParticleTeleport = "particles/items2_fx/teleport_end.vpcf"

EventsSDK.on("GameStarted", () => {
	console.log()
})
// EventsSDK.on("LinearProjectileCreated", tile => console.log("LinearProjectileCreated", tile))

// EventsSDK.on("TrackingProjectileCreated", tile => console.log("TrackingProjectileCreated", tile))

// EventsSDK.on("TrackingProjectileUpdated", tile => console.log("TrackingProjectileUpdated", tile))

EventsSDK.on("Draw", () => {
	RendererSDK.Image(Paths.Icons.icon_svg_creep, new Vector2(-1194, -861))
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
