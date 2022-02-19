interface Card {
  id: number;
  name: string;
  expansion_number: number,
  expansion: string;
  image_url: string;
  unique: boolean;
  type: string;
  subtype?: string;
  text: string;
  raw_text: string;
  flavor: string;
  faction: string;
  artist: string;
  attack?: number;
  defense?: number;
  ammo?: number;
  cost?: number;
  power?: number;
  durability?: number;
  back?: Card
}

interface User {
  id: number;
  email?: string;
  name: string;
  created_at: Date;
}
interface DeckSlot {
  id?: number;
  quantity: number;
  card: Card
}
interface Deck {
  id: number;
  user: User;
  name: string;
  description: string;
  slots: DeckSlot[]
  captain?: Card;
  faction?: string;
  splash_faction?: string;
  public: boolean
  created_at: Date
}
interface Deckbox extends Deck {
  emplacements: DeckSlot[],
  hold: DeckSlot[],
  holdMap: { [index: string]: DeckSlot[] },
  splash: DeckSlot[],
  splashFactions: string[]
}
