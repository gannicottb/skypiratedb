json.cards(@cards) do |card|
  json.partial! "card", card: card
end

json.partial! "users/current"