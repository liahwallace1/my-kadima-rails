Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static#home'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  #omniauth
  get 'auth/facebook/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')

  resources :users do
    resources :games
  end

  resources :games
  resources :locations
end
