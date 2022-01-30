json.deck do
  json.partial! "decks/deck", deck: @deck
end

json.cards(@cards) do |card|
  json.partial! "cards/card", card: card
end

json.partial! "users/current"