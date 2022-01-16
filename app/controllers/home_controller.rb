class HomeController < ApplicationController
  def index
    # byebug
    @card = Card.find(Card.pluck(:id).sample)
  end
end
