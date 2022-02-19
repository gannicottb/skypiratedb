class Deck < ApplicationRecord
  has_many :deck_slots, dependent: :destroy
  has_many :cards, through: :deck_slots
  accepts_nested_attributes_for :deck_slots, allow_destroy: true
  belongs_to :user

  # Modify default nested attributes behavior - treat the input attributes as the correct full set
  def deck_slots_attributes=(*args)
    # Calculate which slots to destroy (the ones missing from args)
    ids_to_destroy =
      Set.new(self.deck_slots.map(&:id)) -
      Set.new(args[0].map { |o| o["id"] })

    args[0] += ids_to_destroy.to_a.map { |id| { id: id, _destroy: true } }

    super(*args)
  end

  def self.create_from_import(raw_text, params)
    rows = raw_text.split("\n").filter { |s| s.strip.present? }.map { |l| l.split(" ", 2) }

    Deck.create(
      params.merge(
        deck_slots_attributes: rows.map { |r|
          q, n = r
          card_id = Card.with_faces.where(front: { name: n }).pluck(:id).first
          { quantity: q, card_id: card_id }
        },
      ),
    )
  end

  def captain # Card or nil
    deck_slots.filter do |slot|
      slot.card.type.name == "Captain"
    end.first&.card
  end

  def faction # Faction or nil
    captain&.faction
  end

  def splash_slots # DeckSlot[]
    deck_slots.filter do |slot|
      slot.card.faction.name != "Neutral" && slot.card.faction != captain&.faction
    end
  end

  def splash_factions # Faction[]
    Set.new(splash_slots.map { |s| s.card.faction }).to_a
  end

  def private?
    !public
  end
end
