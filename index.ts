import {
	Color,
	EventsSDK,
	MinimapSDK,
	RendererSDK,
	Unit,
	Vector2,
	Vector3
} from "github.com/octarine-public/wrapper/index"

type TeleportHeroObject = {
	heroName: string
	positionStart: Nullable<Vector3>
	positionEnd: Nullable<Vector3>
}
const PathsTeleportParticles = ["particles/items2_fx/teleport_end.vpcf", "particles/items2_fx/teleport_start.vpcf"]
const TeleportHeroes: TeleportHeroObject[] = []

const ShowHeroIconOnScreen = (name: string, vecPos: Vector3) => {
	const [w2sPosition, m2sPosition] = [RendererSDK.WorldToScreen(vecPos), MinimapSDK.WorldToMinimap(vecPos)]
	if (!w2sPosition || !m2sPosition) {
		return
	}
	const pathToIcon = `panorama/images/heroes/icons/${name}_png.vtex_c`
	RendererSDK.Image(pathToIcon, w2sPosition, -1, new Vector2(35, 35), Color.White)
	RendererSDK.Image(pathToIcon, m2sPosition, -1, new Vector2(25, 25), Color.White)
}

EventsSDK.on("EntityCreated", ent => {
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy()) {
		TeleportHeroes.push({
			heroName: ent.Name,
			positionStart: undefined,
			positionEnd: undefined
		})
	}
})

EventsSDK.on("GameEnded", () => {
	TeleportHeroes.clear()
})

EventsSDK.on("Draw", () => {
	TeleportHeroes.forEach(item => {
		if (item.positionEnd !== undefined) {
			ShowHeroIconOnScreen(item.heroName, item.positionEnd)
		}
		if (item.positionStart !== undefined) {
			ShowHeroIconOnScreen(item.heroName, item.positionStart)
		}
	})
})

EventsSDK.on("ParticleUpdated", particle => {
	let type: Nullable<boolean>
	if (PathsTeleportParticles[0] === particle.Path) {
		type = true
	} else if (PathsTeleportParticles[1] === particle.Path) {
		type = false
	} else {
		return
	}

	const ent = particle.ModifiersAttachedTo
	if (!(ent instanceof Unit) || !ent.IsHero || !ent.IsEnemy() || !particle.ControlPoints.has(0)) {
		return
	}

	const obj = TeleportHeroes.find(item => item.heroName === ent.Name)
	if (obj) {
		return (obj[type ? "positionStart" : "positionEnd"] = particle.ControlPoints.get(0))
	}
})

EventsSDK.on("ParticleDestroyed", particle => {
	let type: Nullable<boolean>
	if (PathsTeleportParticles[0] === particle.Path) {
		type = true
	} else if (PathsTeleportParticles[1] === particle.Path) {
		type = false
	} else {
		return
	}

	const ent = particle.ModifiersAttachedTo
	if (!(ent instanceof Unit) || !ent.IsHero || !ent.IsEnemy()) {
		return
	}

	const obj = TeleportHeroes.find(item => item.heroName === ent.Name)
	if (obj) {
		return (obj[type ? "positionStart" : "positionEnd"] = undefined)
	}
})
