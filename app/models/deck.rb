class Deck < ApplicationRecord
  has_many :deck_slots, dependent: :destroy
  has_many :cards, through: :deck_slots
  accepts_nested_attributes_for :deck_slots
  belongs_to :user

  def self.create_from_import(raw_text, params)
    rows = raw_text.split("\n").filter { |s| s.strip.present? }.map { |l| l.split(" ", 2) }

    Deck.create(
      params.merge(
        deck_slots: rows.map { |r|
          q, n = r
          card_id = Card.with_faces.where(front: { name: n }).pluck(:id).first
          DeckSlot.new(quantity: q, card_id: card_id)
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
end
