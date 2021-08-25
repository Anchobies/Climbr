Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  get "/users/all", to: "users#index"
  get "/users/:user_id", to: "users#show"
  patch "/users/:user_id", to: "users#update"

  get "/gyms/all", to: "gyms#index"

  get "/problems/all", to: "problems#index"
  get "/problems", to: "problems#user"
  get "/problems/:problem_id", to: "problems#show"
  post "/problems", to: "problems#create"
  
  get "/approaches", to: "approaches#user"
  get "/approaches/:approach_id", to: "approaches#show"
  post "/approaches", to: "approaches#create"

  # post "/signup", to: "sessions#signup"
  # post "/login", to: "sessions#login"
  # delete "/signout", to: "sessions#destroy"
end
