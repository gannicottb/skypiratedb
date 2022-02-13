class DecksController < ApplicationController
  before_action :set_deck, only: [:show, :update, :edit]
  before_action :require_login, only: [:update, :create, :import, :edit]

  # https://www.mintbit.com/blog/implement-jbuilder-for-creating-json-response-in-ruby-on-rails

  def index
    @decks = Deck.order(created_at: :desc).take(50)
  end

  def show
  end

  def create
    created = Deck.create(
      user: current_user,
      name: "New Deck",
    )
    redirect_to edit_deck_url(created.id)
  end

  def import
    created = Deck.create_from_import(
      import_params[:text],
      user: current_user,
      name: "Imported Deck",
    )
    redirect_to edit_deck_url(created.id)
  end

  def edit
    render(status: :unauthorized) unless @deck.user == current_user
    @cards = Card.includes(:expansion, front: [:subtype, :type, :supertype, :faction, :artist]).all
  end

  def update
    render(status: :unauthorized) unless @deck.user == current_user

    if @deck.update(deck_params)
      @deck
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

  def set_deck
    @deck = Deck.find(params[:id])
  end

  def deck_params
    params.require(:deck).permit(:name, :description, deck_slots_attributes: [:id, :quantity, :card_id])
  end

  def import_params
    params.require(:import).permit(:text)
  end
end
