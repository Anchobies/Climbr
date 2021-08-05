Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :hives, only: [:create] 

  get "/users", to: "users#show"
  
  post "/users/signup", to: "sessions#signup"
  post "/users/login", to: "sessions#login"
  
  get "/hives", to: "hives#show"

  
  get "/messages", to: "messages#received"
  get "/messages/:receiver_id", to: "messages#sent"
  post "/messages", to: "messages#create"
  
  get "/relationships/friends", to: "relationships#friends"
  
  get "/bees/:bee_id", to: "bees#show"
  get "/bees/:hive_id/bees", to: "bees#hive"
end
