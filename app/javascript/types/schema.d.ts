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
  created_at: Date
}
interface DeckSlot {
  quantity: number;
  card: Card
}
interface Deck {
  id: number;
  description: string;
  faction?: string;
  captain?: Card;
  splash?: string;
  slots?: DeckSlot[]
}
