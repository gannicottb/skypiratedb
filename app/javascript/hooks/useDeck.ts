export interface Deckbox extends Deck {
  emplacements: DeckSlot[],
  hold: DeckSlot[],
  holdMap: { [index: string]: DeckSlot[] },
  splash: DeckSlot[],
  splashFactions: Set<string>
}
/*
  Enhance a Deck to make it easier to work with
*/
export default (deck: Deck): Deckbox => {
  const holdTypes = ["Asset", "Crew", "Maneuver", "Special Ammo"]
  // const emplacementTypes = ["Cannon", "Structure"]
  // const captain = deck.slots.filter(s => s.card.type == "Captain")?.[0]?.card

  const emplacements = deck.slots.filter(s => s.card.type == "Emplacement")
  const hold = deck.slots.filter(s => holdTypes.includes(s.card.type))

  const holdMap = holdTypes.reduce((o, ht) => {
    let group = hold.filter(h => h.card.type == ht)
    if (group.length > 0) { o[ht] = group }
    return o
  }, {})

  const splash = deck.slots.filter(s =>
    s.card.faction != "Neutral" && s.card.faction != deck.captain?.faction
  )
  const splashFactions = new Set(splash.map(s => s.card.faction))

  return {
    ...deck,
    emplacements,
    hold,
    holdMap,
    splash,
    splashFactions
  }
}

// class Deckbox {
//   deck: Deck
//   constructor(deck: Deck) {
//     this.deck = deck
//   }
//   captain(): Card {
//     return this.deck.slots.filter(s => s.card.type == "Captain")[0].card
//   }


// }
