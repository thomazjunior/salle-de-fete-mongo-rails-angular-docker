class SidekiqStatsChannel < ApplicationCable::Channel
  # Cette méthode est exécutée lorsqu'un client s'abonne au canal.
  # Elle permet à l'utilisateur de recevoir les mises à jour sur l'état de Sidekiq en temps réel.
  def subscribed
    stream_from "sidekiq_stats"
    Rails.logger.info "Utilisateur abonné au canal SidekiqStats"
  end

  # Cette méthode est appelée automatiquement lorsqu'un client se désabonne du canal.
  # Elle peut être utilisée pour nettoyer des ressources ou simplement suivre les connexions.
  def unsubscribed
    Rails.logger.info "Utilisateur désabonné du canal SidekiqStats"
  end

  # Méthode pour récupérer et diffuser les statistiques de Sidekiq.
  # Elle est déclenchée manuellement par un client via WebSockets.
  def fetch_stats
    # Initialisation d'un objet Sidekiq::Stats pour récupérer les données actuelles
    stats = Sidekiq::Stats.new

    # Construction d'une structure de données contenant les principales statistiques de Sidekiq
    data = {
      en_cours: stats.workers_size,  # Nombre de jobs en cours d'exécution
      en_attente: stats.enqueued,    # Nombre de jobs en attente dans les files d'attente
      traitées: stats.processed,     # Nombre total de jobs traités depuis le démarrage
      échouées: stats.failed,        # Nombre total de jobs ayant échoué
      files: stats.queues            # Liste des files d'attente et de leur charge
    }

    # Diffusion des statistiques en temps réel à tous les clients abonnés au canal
    ActionCable.server.broadcast("sidekiq_stats", data)
    Rails.logger.info "Statistiques de Sidekiq diffusées avec succès"

  rescue StandardError => e
    # Capture et log de toute erreur potentielle lors de la récupération des statistiques
    Rails.logger.error "Erreur lors de la récupération des statistiques de Sidekiq: #{e.message}"
  end
end
