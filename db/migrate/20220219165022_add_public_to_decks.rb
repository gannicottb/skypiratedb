class AddPublicToDecks < ActiveRecord::Migration[6.1]
  def change
    add_column :decks, :public, :boolean, default: false
  end
end
