Rails.application.routes.draw do
  root 'home#index'
  resources :movies
  get 'seats', to: 'seats#index'
  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
