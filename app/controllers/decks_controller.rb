class DecksController < ApplicationController
  def index
    @decks = Deck.take(50)
  end

  def show
  end
end
