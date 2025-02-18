module Bookable
  extend ActiveSupport::Concern

  included do
    belongs_to :client
    belongs_to :package

    validates :date, :start_time, :end_time, :number_of_guests, :status, :total_value, presence: true
    validate :end_time_after_start_time

    scope :upcoming, -> { where('date >= ?', Date.today) }
    scope :past, -> { where('date < ?', Date.today) }
  end

  def end_time_after_start_time
    if end_time <= start_time
      errors.add(:end_time, "must be after the start time")
    end
  end
end
