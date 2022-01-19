class CardsController < ApplicationController
  def index
    @cards = Card.includes(:expansion, front: [:subtype, :type, :supertype, :faction, :artist]).all
  end

  def show
    @card = Card.find(params[:id])
  end
end
