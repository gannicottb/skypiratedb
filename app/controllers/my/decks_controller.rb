module My
  class DecksController < ApplicationController
    before_action :require_login

    def index
      @decks = Deck.where(user: current_user)
    end

    def create
    end

    def edit
    end

    private

    def deck_params
      params.require(:deck).permit(:name, :description, slots: [:quantity, :id])
    end
  end
end
