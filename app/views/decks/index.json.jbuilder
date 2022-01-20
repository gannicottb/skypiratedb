json.decks do
  json.partial! "decks/deck", collection: @decks, as: :deck
end

json.partial! "users/current"