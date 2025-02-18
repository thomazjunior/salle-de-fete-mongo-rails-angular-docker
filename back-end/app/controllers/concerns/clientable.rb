module Clientable
  extend ActiveSupport::Concern

  included do
    has_many :bookings, dependent: :destroy

    validates :name, :email, presence: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
    validates :phone_number, format: { with: /\A[+\d].{10,}\z/, message: "is invalid" }, allow_blank: true
  end
end
