json.card do
  json.partial! "cards/card", obj: @card
end

json.partial! "users/current"