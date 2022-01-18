# Add all simple values
json.(obj, :id, :image_url, :name, :expansion_number, :unique, :text, :raw_text, :flavor)
json.(obj, :attack, :defense, :cost, :power, :durability, :ammo)

# Resolve associations
json.type obj.type.name
json.supertype obj.supertype.name
json.subtype obj.subtype.name
json.faction obj.faction.name
json.artist obj.artist.name
json.expansion obj.expansion.name

# Embed back side if present
if obj.respond_to?(:back) && obj.back.present?
  json.back do
    json.partial! "cards/card", obj: obj.back
  end
end