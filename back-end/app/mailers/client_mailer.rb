class ClientMailer < ApplicationMailer
  def confirmation_reservation(client, booking)
    @client = client
    @booking = booking
    mail(to: @client.email, subject: "Votre réservation est confirmée !")
  end

  def birthday_wishes(client)
    @client = client
    mail(to: @client.email, subject: "Happy Birthday, #{@client.name}!")
  end
end
