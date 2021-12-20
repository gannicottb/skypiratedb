# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# core = Expansion.create(name: "Core", code: "SP", release_date: Date.new(2021, 1, 31))
# awakening = Expansion.create(name: "Awakening", code: "AWA", release_date: Date.new(2021, 1, 31))

# Faction.create([
#   { name: "Neutral" },
#   { name: "Pirate" },
#   { name: "Imperial" },
#   { name: "Ghost" },
#   { name: "Devoted" },
#   { name: "Trader" },
# ])

# trader = Faction.where(name: "Trader").first_or_create
# rexard = Artist.create(name: "REXARD")
# captain_type, crew_type = Type.create([{ name: "Captain" }, { name: "Crew" }])
# tactic_supertype = Supertype.create(name: "Tactic")
# subtypes = Subtype.create([{ name: "Deckhand" }, { name: "Shade" }, { name: "Cannon" }, { name: "Structure" }])

# front, back = CardInfo.create(
#   [
#     {
#       name: "Luc Sangre",
#       unique: true,
#       supertype: nil,
#       type: captain_type,
#       subtype: nil,
#       raw_text: "When your turn begins, you may spend 1(P) to flip this card and put it into play. The first time you breach each turn, shuffle a Shield into your Hold.",
#       text: "<p>When your turn begins, you may spend 1<i class='far fa-dot-circle'></i> to flip this card and put it into play.</p>\n\n<p>The first time you breach each turn, shuffle a Shield into your Hold.</p>\n",
#       flavor: "",
#       faction: trader,
#       artist: rexard,
#       attack: nil,
#       defense: nil,
#       ammo: nil,
#       cost: nil,
#       power: nil,
#       durability: nil,
#       image_url: "https://skypiratedb.s3.amazonaws.com/lucsangre.png",
#     },
#     {
#       name: "The Bat",
#       unique: true,
#       supertype: nil,
#       type: crew_type,
#       subtype: nil,
#       raw_text: "*React -* When this crew would leave play, flip it instead.",
#       text: "<p><em>React -</em> When this crew would leave play, flip it instead.</p>\n",
#       flavor: "<p>Skree!</p>\n",
#       faction: trader,
#       artist: rexard,
#       attack: 1,
#       defense: 1,
#       ammo: nil,
#       cost: nil,
#       power: nil,
#       durability: nil,
#       image_url: "https://skypiratedb.s3.amazonaws.com/thebat.png",
#     },
#   ]
# )
# luc = Card.create(expansion: awakening, expansion_number: 99, front: front, back: back)
