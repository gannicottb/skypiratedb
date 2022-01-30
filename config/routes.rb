Rails.application.routes.draw do
  root to: "home#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :cards, only: [:index, :show]

  resources :users, only: [:show, :create, :update] do
    member do
      get :activate
    end
  end

  resources :decks, only: [:index, :show, :create, :edit, :update] do
    collection do
      post :import
    end
  end
  namespace :my do
    resources :decks, only: [:index, :create, :edit]
  end

  resources :password_resets, only: [:new, :create, :edit, :update]

  get "login" => "user_sessions#new", as: :login
  post "login" => "user_sessions#create"
  post "logout" => "user_sessions#destroy", as: :logout
end
