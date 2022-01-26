class DecksController < ApplicationController
  def index
    @decks = Deck.take(50)
  end

  def show
    @deck = Deck.find(params[:id])
  end

  def update
    @deck = Deck.find(params[:id])
  end

  private

  def deck_params
    params.require(:deck).permit(:name, slots: [:quantity, :id])
  end
end
