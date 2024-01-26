import { EventsSDK, Unit } from "github.com/octarine-public/wrapper/index"

const enemyHeroesInfo: {
	[key: string]: {
		tpCooldown: number
		lastPosition: {
			x: number
			y: number
		}
		visible: boolean
	}
} = {}

EventsSDK.on("GameStarted", () => {
	console.log()
})
// EventsSDK.on("LinearProjectileCreated", tile => console.log("LinearProjectileCreated", tile))

// EventsSDK.on("TrackingProjectileCreated", tile => console.log("TrackingProjectileCreated", tile))

// EventsSDK.on("TrackingProjectileUpdated", tile => console.log("TrackingProjectileUpdated", tile))

EventsSDK.on("EntityCreated", ent => {
	if (ent instanceof Unit && ent.IsHero && ent.IsEnemy()) {
		if (!(ent.Name_ in enemyHeroesInfo)) {
			enemyHeroesInfo[ent.Name_] = {
				tpCooldown: 0,
				lastPosition: {
					x: ent.Position.x,
					y: ent.Position.y
				},
				visible: ent.IsVisible
			}
		}
	}
})
EventsSDK.on("PreEntityCreated", ent => console.log("PreEntityCreated", ent))

EventsSDK.on("EntityVisibleChanged", ent => console.log("EntityVisibleChanged", ent))

EventsSDK.on("UnitAnimation", npc => console.log("UnitAnimation", npc))
EventsSDK.on("UnitAnimationEnd", npc => console.log("UnitAnimationEnd", npc))

EventsSDK.on("AbilityCooldownChanged", abil => {
	const hero = abil.OwnerEntity
	if (!hero) {
		return
	}

	if (!(hero instanceof Unit) || !hero.IsHero || !hero.IsEnemy() || !(hero.Name_ in enemyHeroesInfo)) {
		return
	}

	console.log("abil", abil)
})

// EventsSDK.on("AbilityCooldownChanged", a => {
// 	const hero = LocalPlayer?.Hero
// 	if (!hero) {
// 		return
// 	}
// 	console.log("A", a.Distance2D(hero))
// })
