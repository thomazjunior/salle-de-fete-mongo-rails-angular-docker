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

  # Associations
  has_many :bookings, dependent: :destroy

  # Validations
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone_number, presence: true, uniqueness: true
  validates :address, presence: true

  # Indexes
  index({ email: 1 }, { unique: true })
  index({ phone_number: 1 }, { unique: true })

  # Callbacks
  after_save :update_booking_statistics

  # Methods
  def total_booking_value
    self.total_value_of_books
  end

  def update_booking_statistics
    #self.first_booking_date = bookings.order_by(date: :asc).first&.date
    #self.last_booking_date = bookings.order_by(date: :desc).first&.date
    #self.number_of_bookings = bookings.count
    #self.total_value_of_books = bookings.sum(:total_value)
    #save
  end

  # Access payments through bookings
  def payments
    Payment.where(:booking_id.in => bookings.pluck(:id))
  end

  # Sum of completed payments
  def completed_payments
    payments.where(status: 2).sum(:amount)
  end
end
