class BookingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "booking_channel"
  end
end