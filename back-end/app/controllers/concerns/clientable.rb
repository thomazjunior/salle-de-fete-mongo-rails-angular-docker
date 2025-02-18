# Module concern pour les clients
module Clientable
  extend ActiveSupport::Concern

  included do
    # Association avec les réservations (dépendance : suppression en cascade)
    has_many :bookings, dependent: :destroy

    # Validation de la présence des champs requis
    validates :name, :email, presence: true

    # Validation du format de l'email et unicité
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true

    # Validation du numéro de téléphone (optionnel) avec un format spécifique
    validates :phone_number, format: { with: /\A[+\d].{10,}\z/, message: "est invalide" }, allow_blank: true
  end
end
