class Incident
  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :date, type: Date
  field :description, type: String
  field :resolved, type: Boolean, default: false
  field :resolution_details, type: String
  field :severity, type: Integer  # 1 = Low, 2 = Medium, 3 = High

  # Associations
  belongs_to :booking  # An incident belongs to a booking

  # Validations
  validates :date, presence: true
  validates :description, presence: true
  validates :severity, inclusion: { in: [1, 2, 3], message: "must be 1 (Low), 2 (Medium), or 3 (High)" }

  # Scopes
  scope :unresolved, -> { where(resolved: false) }
  scope :high_severity, -> { where(severity: 3) }
end
