class Deck < ApplicationRecord
  has_many :deck_slots, dependent: :destroy
  has_many :cards, through: :deck_slots
  belongs_to :user

  def self.create_example
    raw = %{
      1 Rook Prior
      1 Medbay
      1 Palisade
      1 Trade Pod
      1 Incubating Behemoth
      2 Absorb
      2 All Hands on Deck!
      2 Attendant
      2 Awestruck
      2 Big Mouth
      1 Captain on Deck
      1 Cloudshaker Magnus
      2 Contract to Kill
      2 Cultivator
      2 Harbinger
      1 Inspired by Giants
      2 Offering to Cthalla
      2 Pile On
      2 Rally
      1 Slush Fund
      2 Smelly Pete
      2 Straw Man
    }

    rows = raw.split("\n").filter { |s| s.strip.present? }.map { |l| l.split(" ", 2) }

    d = Deck.where(user: User.first, name: "Cthalla Beats", description: "Rally + Straw Man is OP?").first_or_create

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
