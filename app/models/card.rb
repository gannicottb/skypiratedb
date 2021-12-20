class Card < ApplicationRecord
  belongs_to :expansion
  belongs_to :front, class_name: "CardInfo"
  belongs_to :back, class_name: "CardInfo", optional: true

  # Default a set of calls to front CardInfo
  delegate *CardInfo::FIELDS, to: :front
end
