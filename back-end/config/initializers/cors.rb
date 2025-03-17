# Assurez-vous de redémarrer votre serveur lorsque vous modifiez ce fichier.

# Évitez les problèmes de CORS lorsque l'API est appelée depuis l'application frontend.
# Gérez le partage des ressources entre origines (CORS) afin d'accepter les requêtes Ajax cross-origin.

# Lire plus : https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:4200', 'https://mon-domaine.com', 'https://api.trusted.com'

    resource '*',
      headers: %w(Authorization Content-Type Accept X-Requested-With),
      expose: %w(Authorization X-CSRF-Token),
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true,
      max_age: 600 # Cache des pré-vérifications pendant 10 minutes
  end

  allow do
    origins '*' # Autoriser toutes les origines uniquement pour les requêtes GET et OPTIONS
    
    resource '*',
      headers: :any,
      methods: [:get, :options],
      max_age: 300
  end
end