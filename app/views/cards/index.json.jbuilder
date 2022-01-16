json.cards(@cards) do |card|
  json.partial! "card", obj: card
end

json.partial! "users/current"