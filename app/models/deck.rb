class Deck < ApplicationRecord
  has_many :deck_slots, dependent: :destroy
  has_many :cards, through: :deck_slots
  accepts_nested_attributes_for :deck_slots
  belongs_to :user

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

  def self.raw
    %{
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
  end

  def self.raw_2
    %{
      1 Apollo
      1 Hullpiercer
      1 Medbay
      1 Loot Bags
      1 Mess Hall
      2 All Hands on Deck!
      1 Arsonist
      1 Buddy System
      2 Chef Danl
      2 Drawn to the Flame
      1 Dusty Zeke
      2 Firebug
      2 Frontliner
      2 Open Keg
      1 Pike
      2 Ramming Speed
      2 Skirmish
      2 Smelly Pete
      1 Steady at the Helm
      2 Step Lively
      2 Surly Quartermaster
      1 Sweep the Leg
      2 Walk the Plank
    }
  end

  def self.create_example_2
    rows = raw_2.split("\n").filter { |s| s.strip.present? }.map { |l| l.split(" ", 2) }

    Deck.create(
      user: User.first,
      name: "Butane",
      description: "Made via nested_attributes",
      deck_slots: rows.map { |r|
        q, n = r
        card_id = Card.with_faces.where(front: { name: n }).pluck(:id).first
        DeckSlot.new(quantity: q, card_id: card_id)
      },
    )
  end

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

  def self.create_example
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
