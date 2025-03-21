class Booking
  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :date, type: Date
  field :start_time, type: Time
  field :end_time, type: Time
  field :number_of_guests, type: Integer
  field :status, type: Integer  
  field :total_value, type: Float

  # Associations
  belongs_to :client
  belongs_to :package
  has_many :payments, dependent: :destroy
  has_many :incidents, dependent: :destroy

  # Validations
  validates :date, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :number_of_guests, numericality: { greater_than: 0 }
  validates :status, inclusion: { in: [1, 2, 3], message: "must be 1 (Confirmée), 2 (En attente), ou 3 (Annulée)" }

  # Scopes
  scope :confirmed, -> { where(status: 1) }
  scope :pending, -> { where(status: 2) }
  scope :canceled, -> { where(status: 3) }

  # Callbacks
  after_update :envoyer_email_confirmation, if: -> { saved_change_to_status? && status == 1 }
  after_update :broadcast_booking_update

  # Methods
  def total_payments
    payments.completed.sum(:amount)
  end

  def duration_in_hours
    return unless start_time && end_time
    ((end_time - start_time) / 1.hour).round(2)
  end
  
  

  private

  def broadcast_booking_update
    ActionCable.server.broadcast("booking_channel", {
      type: "booking_update",
      booking: self.as_json
    })
  end

  def envoyer_email_confirmation
    ConfirmationReservationJob.perform_later(id)
  end
end
  