class Deck < ApplicationRecord
  has_many :deck_slots
  has_many :cards, through: :deck_slots
  belongs_to :user

  def self.create_example
    rows = [
      [1, "Cleaver"],
      [1, "Mess Hall"],
      [1, "Palisade"],
      [1, "Loot Bags"],
      [1, "Raging Bull"],
    ]

    d = Deck.where(user: User.first, name: "Cleaver Aggro", description: "example deck").first_or_create

    rows.each do |r|
      q, n = r # destructure the row

      # Find the card
      card_id = Card.with_faces.where(front: { name: n }).pluck(:id).first

      # Associate to the deck
      DeckSlot.where(
        quantity: q,
        card_id: card_id,
        deck_id: d.id,
      ).first_or_create
    end
  end
end
