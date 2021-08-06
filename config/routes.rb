Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  get "/users/all", to: "users#index"
  get "/users/:user_id", to: "users#show"
  
  post "/signup", to: "sessions#signup"
  post "/login", to: "sessions#login"
  delete "/signout", to: "sessions#destroy"
  
  get "/hives/all", to: "hives#index"
  get "/hives", to: "hives#show"
  post "/hives", to: "hives#create"
  patch "/hives/:hive_id", to: "hives#update"
  
  get "/messages", to: "messages#received"
  get "/messages/:receiver_id", to: "messages#sent"
  post "/messages", to: "messages#create"
  
  get "/relationships/friends", to: "relationships#friends"
  patch "/relationships/:user_id", to: "relationships#friend"
  
  get "/bees/:bee_id", to: "bees#show"
  get "/bees/:hive_id/bees", to: "bees#hive"
  post "/bees/:hive_id", to: "bees#create"
  delete "/bees/:bee_id", to: "bees#destroy"
end
