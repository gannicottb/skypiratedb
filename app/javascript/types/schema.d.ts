interface Type {
  name: string;
}
interface Subtype {
  name: string;
}
interface Faction {
  name: string;
}
interface Artist {
  name: string;
}

interface CardInfo {
  name: string;
  image_link: string;
  unique: boolean;
  type: Type;
  subtype?: Subtype;
  text: string;
  flavor: string;
  faction: Faction;
  artist: Artist;
  attack?: number;
  defense?: number;
  ammo?: number;
  cost?: number;
  power?: number;
  durability?: number;
}

interface Card {
  front: CardInfo
  back?: CardInfo
}