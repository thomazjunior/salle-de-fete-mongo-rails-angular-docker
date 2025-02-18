# Module concern pour les réservations
module Bookable
  extend ActiveSupport::Concern

  included do
    # Association avec le client et le forfait (package)
    belongs_to :client
    belongs_to :package

    # Validation de la présence des champs requis
    validates :date, :start_time, :end_time, :number_of_guests, :status, :total_value, presence: true
    
    # Validation pour vérifier que l'heure de fin est après l'heure de début
    validate :end_time_after_start_time

    # Scope pour les réservations à venir
    scope :upcoming, -> { where('date >= ?', Date.today) }

    # Scope pour les réservations passées
    scope :past, -> { where('date < ?', Date.today) }
  end

  # Méthode de validation pour s'assurer que l'heure de fin est après l'heure de début
  def end_time_after_start_time
    # Vérifie si l'heure de fin est inférieure ou égale à l'heure de début
    if end_time <= start_time
      # Ajoute une erreur si l'heure de fin n'est pas valide
      errors.add(:end_time, "doit être après l'heure de début")
    end
  end
end
