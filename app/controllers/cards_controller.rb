class CardsController < ApplicationController
  def index
    @cards = Card.all
    # Define the jbuilder messages for Cards!
  end
end
