Rails.application.routes.draw do
  
  root to: "welcome#index"

  resources :users, except: [:new] do
    resources :posts, except: [:new]
  end

  resources :cities do 
    resources :posts , except: [:destroy]
  end 

  get "/signup", to: "users#new", as: "new_user"

  # #sign in user page
  get "/login", to: "sessions#new"

  #sign in route
  post "/sessions", to: "sessions#create"

  #logout route 
  delete "/logout", to: "sessions#destroy", as: "logout"

  #destroy post
  delete '/cities/:city_id/posts/:id', to: 'posts#destroy', as: 'delete_city_post'

  #tags route 
  get 'tags/:tag', to: 'articles#index', as: :tag

  # #profile
  #get "/users/:id", to: "users#show", as: "user"

  # #single post show
  #get "/users/:user_id/posts/:id", to: "posts#show", as: "user_post"

  # #cities main page / home
  #get "/cities", to: "cities#index", as: "cities"

  # #one city has all the posts
  #get "/cities/:id/posts", to: "cities#show", as: "city"

  # #creating a new post 
  #get "/users/:user_id/posts/new", to: "posts#new", as: "new_post"

  # #creating a post
  #post "/users/:user_id/posts", to: "posts#create" 

  # #creating a new user
  #post "/users", to: "users#create"


  #get the edit  profile page 
  #get "/users/:id/edit", to: "users#edit"

  #updating the user
  #patch "/users" , to: 'users#update'


  # #updating the user

  # patch "/users/:id", to: "users#update"
end
