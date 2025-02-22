class BirthdayWishesJob < ApplicationJob
  queue_as :default

  def perform
    # Trouver les clients dont l'anniversaire est aujourd'hui
    clients = Client.where("DATE(birthday) = ?", Date.today)

    clients.each do |client|
      # Envoyer un email de joyeux anniversaire
      ClientMailer.birthday_wishes(client).deliver_later
    end
  end
end
