class CreateCardInfos < ActiveRecord::Migration[6.1]
  def change
    create_table :card_infos do |t|
      t.string :name
      t.boolean :unique
      t.integer :supertype_id
      t.references :type, null: false, foreign_key: true
      t.integer :subtype_id
      t.text :raw_text
      t.text :text
      t.text :flavor
      t.references :faction, null: false, foreign_key: true
      t.references :artist, null: false, foreign_key: true
      t.integer :attack
      t.integer :defense
      t.integer :ammo
      t.integer :cost
      t.integer :power
      t.integer :durability
      t.string :image_url

      t.timestamps
    end
    add_index :card_infos, :name, unique: true
  end
end
