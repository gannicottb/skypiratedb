class CardInfo < ApplicationRecord
  belongs_to :subtype, optional: true
  belongs_to :supertype, optional: true
  belongs_to :type
  belongs_to :faction
  belongs_to :artist
  has_one :card

  FIELDS = %i(
    name
    unique
    supertype
    type
    subtype
    raw_text
    text
    flavor
    faction
    artist
    attack
    defense
    ammo
    cost
    power
    durability
    image_link
  )
end
