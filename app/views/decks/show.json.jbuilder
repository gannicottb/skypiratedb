json.deck do
  json.partial! "decks/deck", deck: @deck
end

json.partial! "users/current"