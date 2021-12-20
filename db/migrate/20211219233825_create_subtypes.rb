class CreateSubtypes < ActiveRecord::Migration[6.1]
  def change
    create_table :subtypes do |t|
      t.string :name

      t.timestamps
    end
  end
end
