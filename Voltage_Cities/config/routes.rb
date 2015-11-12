Rails.application.routes.draw do
  
  root to: "welcome#index"

  get "/signup", to: "users#new"

  #profile
  get "/users/:id/posts", to: "users#show", as: "user"

  #single post show
  get "/user/:id/posts/:postid", to: "post#show", as: "user_post"

  #cities main page / home
  get "/cities", to: "cities#index", as: "cities"

  #one city has all the posts
  get "/cities/:id/posts", to: "cities#show", as: "city"

  #creating a post
  post "/users/:id/posts", to: "posts#create", as: "new_post"

  #creating a new user
  post "/users", to: "users#create", as: "new_user"
end
