class ClientMailer < ApplicationMailer
  # Méthode pour envoyer un email de confirmation de réservation au client
  # @param client [Client] L'objet client concerné
  # @param booking [Booking] L'objet réservation associé
  def confirmation_reservation(client, booking)
    @client = client
    @booking = booking
    
    # Envoie un email avec l'adresse du client et un objet spécifique
    mail(to: @client.email, subject: "Votre réservation est confirmée !")
  end

  # Méthode pour envoyer un email d'anniversaire au client
  # @param client [Client] L'objet client concerné
  def birthday_wishes(client)
    @client = client
    
    # Envoie un email d'anniversaire avec le nom du client dans l'objet du mail
    mail(to: @client.email, subject: "Happy Birthday, #{@client.name}!")
  end
end
