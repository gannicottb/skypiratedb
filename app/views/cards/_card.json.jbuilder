# Add all simple values
json.(card, :id, :image_url, :name, :expansion_number, :unique, :text, :raw_text, :flavor)
json.(card, :attack, :defense, :cost, :power, :durability, :ammo)

# Resolve associations
json.type card.type.name
json.supertype card.supertype.name
json.subtype card.subtype.name
json.faction card.faction.name
json.artist card.artist.name
json.expansion card.expansion.name

# Embed back side if present
if card.respond_to?(:back) && card.back.present?
  json.back do
    json.partial! "cards/card", card: card.back
  end
end