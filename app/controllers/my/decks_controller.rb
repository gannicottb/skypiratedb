module My
  class DecksController < ApplicationController
    before_action :require_login

    def index
      @decks = Deck.where(user: current_user).order(updated_at: :desc)
    end
  end
end
