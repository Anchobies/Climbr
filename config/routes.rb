Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  get "/problems", to: "problems#index"
  get "/problems/:problem_id", to: "problems#show"
  post "/problems", to: "problems#create"
  
  get "/approaches", to: "approaches#index"
  get "/approaches/:approach_id", to: "approaches#show"

  post "/signup", to: "sessions#signup"
  post "/login", to: "sessions#login"
  delete "/signout", to: "sessions#destroy"
end
