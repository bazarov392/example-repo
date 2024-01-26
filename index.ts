import { Color, EventsSDK, Hero, RendererSDK, Unit, Vector2, Vector3 } from "github.com/octarine-public/wrapper/index"

type TeleportHeroObjectTrue = {
	hero: Hero
	positionStart: Vector3
	positionEnd: Vector3
	status: true
}

type TeleportHeroObjectFalse = {
	hero: Hero
	positionStart: undefined
	positionEnd: undefined
	status: false
}

const TeleportHeroes: (TeleportHeroObjectFalse | TeleportHeroObjectTrue)[] = []

EventsSDK.on("EntityCreated", ent => {
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy()) {
		TeleportHeroes.push({
			hero: ent as Hero,
			positionStart: undefined,
			positionEnd: undefined,
			status: false
		})
	}
})
EventsSDK.on("Draw", () => {
	for (const item of TeleportHeroes) {
		if (item.status) {
			const w2sPosition = RendererSDK.WorldToScreen(item.positionEnd)
			if (!w2sPosition) {
				continue
			}
			RendererSDK.Image(
				`panorama/images/heroes/icons/${item.hero.Name}_png.vtex_c`,
				w2sPosition,
				-1,
				new Vector2(20, 20),
				Color.Red
			)
		}
	}
})

EventsSDK.on("ParticleCreated", particle => {
	if (particle.Path !== "particles/items2_fx/teleport_end.vpcf") {
		return
	}
	console.log(1)
	const ent = particle.ModifiersAttachedTo
	console.log(1, ent)
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy() && particle.ControlPoints.has(0)) {
		// console.log(`${ent.Name_} телепортировался`, particle.ControlPoints.get(0))
		console.log(2)
		const obj = TeleportHeroes.find(item => item.hero.Name === ent.Name)
		if (!obj) {
			return
		}
		console.log(3)
		obj.positionEnd = particle.ControlPoints.get(0)
		obj.status = true
	}
})

EventsSDK.on("ParticleDestroyed", particle => {
	if (particle.Path !== "particles/items2_fx/teleport_end.vpcf") {
		return
	}
	const ent = particle.ModifiersAttachedTo
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy() && particle.ControlPoints.has(0)) {
		const obj = TeleportHeroes.find(item => item.hero.Name === ent.Name)
		if (!obj) {
			return
		}
		obj.status = false
		obj.positionEnd = undefined
	}
})
