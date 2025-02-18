# Module concern pour les forfaits (packages)
module Packageable
  extend ActiveSupport::Concern

  included do
    # Association avec les réservations (dépendance : mise à jour en cas de suppression)
    has_many :bookings, dependent: :nullify

    # Validation de la présence des champs requis
    validates :name, :description, :price, presence: true

    # Validation du prix (doit être un nombre positif ou zéro)
    validates :price, numericality: { greater_than_or_equal_to: 0 }

    # Scope pour filtrer les forfaits disponibles
    scope :available, -> { where(available: true) }
  end

  # Méthode pour formater le prix avec deux décimales
  def formatted_price
    "$#{'%.2f' % price}"
  end
end
