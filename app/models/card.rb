class Card < ApplicationRecord
  belongs_to :expansion
  belongs_to :front, class_name: "CardInfo"
  belongs_to :back, class_name: "CardInfo", optional: true

  # Always join Card to its CardInfos
  # NOTE: must query like this `.where(front: {name: "Absorb"})`
  default_scope { left_outer_joins(:front).left_outer_joins(:back) }

  # Default a set of calls to front CardInfo
  delegate *CardInfo::FIELDS, to: :front
end
