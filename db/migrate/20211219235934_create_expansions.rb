class CreateExpansions < ActiveRecord::Migration[6.1]
  def change
    create_table :expansions do |t|
      t.string :name
      t.string :code
      t.date :release_date

      t.timestamps
    end
  end
end
