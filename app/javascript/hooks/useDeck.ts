/*
  Enhance a Deck to make it easier to work with
*/
export default (deck: Deck): Deckbox => {

  // TODO: So when I moved captain out of here...
  // I also got rid of the ability to add a new captain to a deck :/

  const holdTypes = ["Asset", "Crew", "Maneuver", "Special Ammo"]
  // const emplacementTypes = ["Cannon", "Structure"]
  const emplacements = deck.slots.filter(s => s.card.type == "Emplacement")
  const hold = deck.slots.filter(s => holdTypes.includes(s.card.type))

  const holdMap = holdTypes.reduce((o, ht) => {
    let group = hold
      .filter(h => h.card.type == ht)
      .sort((a, b) => a.card.name.localeCompare(b.card.name))
    if (group.length > 0) { o[ht] = group }
    return o
  }, {})

  const splash = deck.slots.filter(s =>
    s.card.faction != "Neutral" && s.card.faction != deck.captain?.faction
  )
  const splashFactions = Array.from(new Set(splash.map(s => s.card.faction)))

  // const captain = deck.captain || deck.slots.filter(s => s.card.type == "Captain")[0]

  return {
    ...deck,
    emplacements,
    hold,
    holdMap,
    splash,
    splashFactions
  }
}
