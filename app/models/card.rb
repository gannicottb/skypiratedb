class Card < ApplicationRecord
  belongs_to :expansion
  belongs_to :front, class_name: "CardInfo"
  belongs_to :back, class_name: "CardInfo", optional: true

  # Scope to join Card to its CardInfos
  # NOTE: must query like this `Card.with_faces.where(front: {name: "Absorb"})`
  scope :with_faces, -> { left_outer_joins(:front).left_outer_joins(:back) }

  # Default a set of calls to front CardInfo
  delegate *CardInfo::FIELDS, to: :front
end
