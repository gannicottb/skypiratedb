json.cards(@cards) do |card|
  json.partial! "card", obj: card
end