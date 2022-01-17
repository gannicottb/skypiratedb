// interface Type {
//   name: string;
// }
// interface Subtype {
//   name: string;
// }
// interface Faction {
//   name: string;
// }
// interface Artist {
//   name: string;
// }

// interface CardInfo {
//   name: string;
//   image_url: string;
//   unique: boolean;
//   type: Type;
//   subtype?: Subtype;
//   text: string;
//   flavor: string;
//   faction: Faction;
//   artist: Artist;
//   attack?: number;
//   defense?: number;
//   ammo?: number;
//   cost?: number;
//   power?: number;
//   durability?: number;
// }

// interface Card {
//   front: CardInfo
//   back?: CardInfo
// }

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
  email: string,
  name: string
}
