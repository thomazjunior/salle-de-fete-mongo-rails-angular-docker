# Module permettant d'ajouter des fonctionnalités de réservation aux modèles qui l'incluent
module Bookable
  extend ActiveSupport::Concern

  included do
    # Association avec le modèle Client : chaque réservation appartient à un client
    belongs_to :client
    
    # Association avec le modèle Package : chaque réservation est liée à un forfait spécifique
    belongs_to :package

    # Validation pour s'assurer que certains champs obligatoires sont bien remplis
    validates :date, :start_time, :end_time, :number_of_guests, :status, :total_value, presence: true
    
    # Validation personnalisée pour garantir que l'heure de fin est bien après l'heure de début
    validate :end_time_after_start_time

    # Scope permettant de récupérer uniquement les réservations à venir (date actuelle ou future)
    scope :upcoming, -> { where('date >= ?', Date.today) }
    
    # Scope permettant de récupérer uniquement les réservations passées (antérieures à aujourd'hui)
    scope :past, -> { where('date < ?', Date.today) }
  end

  # Méthode de validation pour vérifier que l'heure de fin est bien après l'heure de début
  def end_time_after_start_time
    # Vérifie si l'heure de fin est antérieure ou égale à l'heure de début
    if end_time <= start_time
      # Ajoute une erreur au modèle si la condition n'est pas respectée
      errors.add(:end_time, "doit être après l'heure de début")
    end
  end
end
