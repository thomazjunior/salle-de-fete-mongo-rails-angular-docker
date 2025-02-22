Rails.application.routes.draw do
  get "clients/index"
  # Définissez vos routes d'application selon le DSL sur https://guides.rubyonrails.org/routing.html

  # Vérifie l'état de santé de l'application sur /up 
  # Renvoie 200 si l'application démarre sans exceptions, sinon 500.
  # Utilisé par les équilibreurs de charge et les moniteurs de disponibilité.
  get "up" => "rails/health#show", as: :rails_health_check

  get '/sidekiq-stats', to: 'jobs#sidekiq_stats'
  post '/trigger-birthday-job', to: 'jobs#trigger_birthday_job'

  # Routes pour toutes les actions CRUD dans BookingsController
  resources :bookings
  
  # Routes pour ClientsController
  resources :clients, only: [:index, :show, :new, :create, :edit, :update, :destroy]

  # Routes pour PackagesController
  resources :packages, only: [:create]

  # Routes pour PaymentsController
  resources :payments, only: [:create]

  # Définit la route racine ("/")
  # root "posts#index"
end
