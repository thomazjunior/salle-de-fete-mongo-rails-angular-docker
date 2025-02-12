class Payment
  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :amount, type: Float
  field :payment_date, type: Date
  field :payment_method, type: Integer  
  field :status, type: Integer 

  # Associations
  belongs_to :booking 

  # Validations
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :payment_date, presence: true
  validates :payment_method, inclusion: { in: [1, 2, 3], message: "must be 1 (Cash), 2 (Card), or 3 (Online)" }
  validates :status, inclusion: { in: [1, 2, 3], message: "must be 1 (Pending), 2 (Completed), or 3 (Failed)" }

  # Scopes
  scope :completed, -> { where(status: 2) }
  scope :failed, -> { where(status: 3) }
end
