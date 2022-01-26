json.(deck, :id, :name, :description)

json.slots deck.deck_slots do |ds|
  json.quantity ds.quantity
  json.card do
    json.partial! "cards/card", card: ds.card
  end
end