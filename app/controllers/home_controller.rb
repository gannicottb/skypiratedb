class HomeController < ApplicationController
  def index
    @card = Card.find(Card.pluck(:id).sample)
  end
end
