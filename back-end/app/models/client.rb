class Client
  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :name, type: String
  field :email, type: String
  field :phone_number, type: String
  field :company_name, type: String
  field :address, type: String
  field :preferred_contact_method, type: String
  field :first_booking_date, type: DateTime
  field :last_booking_date, type: DateTime
  field :number_of_bookings, type: Integer, default: 0
  field :total_value_of_books, type: Float, default: 0.0

  # Validations
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone_number, presence: true
  validates :address, presence: true

  # Indexes
  index({ email: 1 }, { unique: true })
  index({ phone_number: 1 }, { unique: true })

  def total_booking_value
    self.total_value_of_books
  end
end
