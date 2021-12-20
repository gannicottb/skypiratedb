class Faction < ApplicationRecord
  has_many :cards, through: :card_infos
end
