class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.references :front, null: false, foreign_key: { to_table: :card_infos }
      t.integer :back_id
      t.references :expansion, null: false, foreign_key: true
      t.integer :expansion_number

      t.timestamps
    end
  end
end
