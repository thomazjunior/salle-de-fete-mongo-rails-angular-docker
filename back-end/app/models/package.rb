class Package
  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :name, type: String
  field :description, type: String
  field :price, type: Float
  field :features, type: Array  # Array field manually added

  # Validations
  validates :name, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
