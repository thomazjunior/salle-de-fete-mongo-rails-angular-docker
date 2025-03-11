class BookingChannel < ApplicationCable::Channel
  # Méthode exécutée lorsqu'un client s'abonne à ce canal
  def subscribed
    # Vérifie si un paramètre 'booking_id' est fourni
    if params[:booking_id].present?
      stream_from "booking_channel_#{params[:booking_id]}"
      Rails.logger.info "Utilisateur abonné au canal de réservation #{params[:booking_id]}"
    else
      stream_from "booking_channel"
      Rails.logger.info "Utilisateur abonné au canal de réservation général"
    end
  end

  # Méthode exécutée lorsqu'un client se désabonne du canal
  def unsubscribed
    Rails.logger.info "Utilisateur désabonné du canal de réservation"
  end

  # Méthode pour recevoir et diffuser les messages aux abonnés
  def receive(data)
    # Vérification des données reçues
    if data["action"] == "update"
      ActionCable.server.broadcast("booking_channel", data)
      Rails.logger.info "Mise à jour diffusée sur le canal de réservation"
    else
      Rails.logger.warn "Action non reconnue reçue sur le canal de réservation"
    end
  end
end
