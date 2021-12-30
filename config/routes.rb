Rails.application.routes.draw do
  root to: "home#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :cards, only: [:index, :show]

  resources :users

  get "login" => "user_sessions#new", :as => :login
  post "login" => "user_sessions#create"
  post "logout" => "user_sessions#destroy", :as => :logout
end
