import { Color, EventsSDK, RendererSDK, Unit, Vector2, Vector3 } from "github.com/octarine-public/wrapper/index"

type TeleportHeroObject = {
	heroName: string
	positionStart: Nullable<Vector3>
	positionEnd: Nullable<Vector3>
}
const PathsTeleportParticles = ["particles/items2_fx/teleport_end.vpcf", "particles/items2_fx/teleport_start.vpcf"]
const TeleportHeroes: TeleportHeroObject[] = []

const ShowHeroIconOnScreen = (name: string, vecPos: Vector3) => {
	const w2sPosition = RendererSDK.WorldToScreen(vecPos)
	if (!w2sPosition) {
		return
	}
	RendererSDK.Image(
		`panorama/images/heroes/icons/${name}_png.vtex_c`,
		w2sPosition,
		-1,
		new Vector2(35, 35),
		Color.White.SetA(200)
	)
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
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy() && particle.ControlPoints.has(0)) {
		const obj = TeleportHeroes.find(item => item.heroName === ent.Name)
		if (!obj) {
			return
		}

		return type
			? (obj.positionStart = particle.ControlPoints.get(0))
			: (obj.positionEnd = particle.ControlPoints.get(0))
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
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy() && particle.ControlPoints.has(0)) {
		const obj = TeleportHeroes.find(item => item.heroName === ent.Name)
		if (!obj) {
			return
		}

		return type ? (obj.positionStart = undefined) : (obj.positionEnd = undefined)
	}
})
