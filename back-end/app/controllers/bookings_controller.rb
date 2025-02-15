class BookingsController < ApplicationController
  # GET /bookings
  # Affiche toutes les réservations
  def index
    @bookings = Booking.all
    render json: @bookings, status: :ok
  end

  # GET /bookings/:id
  # Affiche une réservation spécifique
  def show
    @booking = Booking.find_by(id: params[:id])
    if @booking
      render json: @booking, status: :ok
    else
      render json: { error: "Réservation introuvable" }, status: :not_found
    end
  end

  # POST /bookings
  # Crée une nouvelle réservation
  def create
    @booking = Booking.new(booking_params)
    if @booking.save
      render json: @booking, status: :created
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  # PUT /bookings/:id
  # Met à jour une réservation existante
  def update
    @booking = Booking.find_by(id: params[:id])
    if @booking
      if @booking.update(booking_params)
        render json: @booking, status: :ok
      else
        render json: @booking.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "Réservation introuvable" }, status: :not_found
    end
  end

  # DELETE /bookings/:id
  # Supprime une réservation
  def destroy
    @booking = Booking.find_by(id: params[:id])
    if @booking
      @booking.destroy
      render json: { message: "Réservation supprimée avec succès" }, status: :ok
    else
      render json: { error: "Réservation introuvable" }, status: :not_found
    end
  end

  private

  # Filtre les paramètres autorisés pour éviter les failles de sécurité
  def booking_params
    params.require(:booking).permit(:date, :start_time, :end_time, :number_of_guests, :status, :total_value, :client_id, :package_id)
  end
end
