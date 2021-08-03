Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :hives, only: [:index, :create] # temporarily got rid of :update and :destroy
  # resources :users, only: [:show, :create, :update, :destroy]
  # resources :bees, only: [:index, :create, :destroy]
  # resources :relationships, only: [:index, :create]
  # resources :chats, only: [:index, :create]
  # resources :messages, only: [:index, :create, :update, :destroy]

  # get "/users/:id/friends", to: "users#friends"
  # patch "/relationships/:id", to: "relationships#friend"
end
