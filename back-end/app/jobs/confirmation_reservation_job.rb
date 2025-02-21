class ConfirmationReservationJob < ApplicationJob
  queue_as :default

  def perform(booking_id)
    # Trouver la réservation
    booking = Booking.find(booking_id)
    
    # Vérifier si la réservation est confirmée
    if booking.status == 1
      # Envoyer un email de confirmation au client
      ClientMailer.confirmation_reservation(booking.client, booking).deliver_later
    end
  end
end
