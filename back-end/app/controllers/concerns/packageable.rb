module Packageable
  extend ActiveSupport::Concern

  included do
    has_many :bookings, dependent: :nullify

    validates :name, :description, :price, presence: true
    validates :price, numericality: { greater_than_or_equal_to: 0 }

    scope :available, -> { where(available: true) }
  end

  def formatted_price
    "$#{'%.2f' % price}"
  end
end
