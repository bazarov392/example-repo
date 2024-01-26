import { EventsSDK, Unit } from "github.com/octarine-public/wrapper/index"

const PathParticleTeleport = "particles/items2_fx/teleport_end.vpcf"

EventsSDK.on("GameStarted", () => {
	console.log()
})
// EventsSDK.on("LinearProjectileCreated", tile => console.log("LinearProjectileCreated", tile))

// EventsSDK.on("TrackingProjectileCreated", tile => console.log("TrackingProjectileCreated", tile))

// EventsSDK.on("TrackingProjectileUpdated", tile => console.log("TrackingProjectileUpdated", tile))

EventsSDK.on("ParticleDestroyed", particle => {
	if (particle.Path !== PathParticleTeleport) {
		return
	}
	const ent = particle.ModifiersAttachedTo
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy() && particle.ControlPoints.has(0)) {
		console.log(`${ent.Name_} телепортируется`, particle.ControlPoints.get(0))
	}
})
