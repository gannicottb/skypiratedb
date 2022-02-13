json.(deck, :id, :name, :description, :created_at)

json.captain do
  json.partial! "cards/card", card: deck.captain if deck.captain.present?
end

json.faction deck.faction&.name

json.splash_faction deck.splash_factions.first&.name


json.slots deck.deck_slots do |ds|
  json.(ds, :id, :quantity)
  #json.is_splash ds.card.faction == deck.faction
  json.card do
    json.partial! "cards/card", card: ds.card
  end
end

json.user do
  json.partial! "users/user", user: deck.user
end