class ClientMailer < ApplicationMailer
  def confirmation_reservation(client, booking)
    @client = client
    @booking = booking
    mail(to: @client.email, subject: "Votre réservation est confirmée !")
  end
end
