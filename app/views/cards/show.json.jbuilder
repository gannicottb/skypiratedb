json.card do
  json.partial! "cards/card", card: @card
end

json.partial! "users/current"