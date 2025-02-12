class BookingsController < ApplicationController
  def create
    @booking = Booking.new(booking_params)
    if @booking.save
      render json: @booking, status: :created
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  private

  def booking_params
    params.require(:booking).permit(:date, :start_time, :end_time, :number_of_guests, :status, :total_value, :client_id, :package_id)
  end
end
