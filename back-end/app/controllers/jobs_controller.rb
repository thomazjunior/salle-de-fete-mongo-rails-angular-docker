# Contrôleur pour la gestion des jobs asynchrones via Sidekiq
class JobsController < ApplicationController
  # Récupère les statistiques globales de Sidekiq
  # Utile pour surveiller l'état des jobs en arrière-plan
  def sidekiq_stats
    stats = Sidekiq::Stats.new
    render json: {
      processed: stats.processed,  # Nombre total de jobs traités avec succès
      failed: stats.failed,        # Nombre total de jobs ayant échoué
      enqueued: stats.enqueued     # Nombre de jobs en attente d'exécution
    }
  end

  # Déclenche un job asynchrone pour envoyer des messages d'anniversaire
  # Ce job sera ajouté à la file d'attente de Sidekiq
  def trigger_birthday_job
    BirthdayWishesJob.perform_later

    # Diffusion des nouvelles statistiques via ActionCable pour mise à jour en temps réel
    Sidekiq::Stats.new.tap do |stats|
      ActionCable.server.broadcast("sidekiq_stats", {
        processed: stats.processed,
        failed: stats.failed,
        enqueued: stats.enqueued
      })
    end

    render json: { message: "Birthday job triggered!" }
  end
end
