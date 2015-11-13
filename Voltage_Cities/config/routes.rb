Rails.application.routes.draw do
  
  root to: "welcome#index"

  get "/signup", to: "users#new", as: "new_user"

  #profile
  get "/users/:id", to: "users#show", as: "user"

  #single post show
  get "/user/:id/posts/:postid", to: "post#show", as: "user_post"

  #cities main page / home
  get "/cities", to: "cities#index", as: "cities"

  #one city has all the posts
  get "/cities/:id/posts", to: "cities#show", as: "city"

  #creating a post
  post "/users/:id/posts", to: "posts#create", as: "new_post"

  #creating a new user
  post "/users", to: "users#create"

  #sign in user 
  get "/login", to: "sessions#new"

  #sign in route
  post "/sessions", to: "sessions#create"

  #editing the profile page 
  get "/users/:id/edit", to: "users#edit"

  #updating the user
  put "/users" , to: 'users#update'
end
