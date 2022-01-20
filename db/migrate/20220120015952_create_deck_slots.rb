class CreateDeckSlots < ActiveRecord::Migration[6.1]
  def change
    create_table :deck_slots do |t|
      t.references :deck, null: false, foreign_key: true, index: true
      t.references :card, null: false, foreign_key: true, index: true
      t.integer :quantity

      t.timestamps
    end
  end
end
