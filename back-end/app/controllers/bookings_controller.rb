class BookingsController < ApplicationController
  # GET /bookings
  # Récupère et affiche toutes les réservations disponibles.
  # Cette action est utilisée pour afficher la liste complète des réservations, 
  # ce qui peut être utile pour un administrateur ou un système de gestion.
  def index
    @bookings = Booking.all
    render json: @bookings, status: :ok
  end

  # GET /bookings/:id
  # Recherche et affiche une réservation spécifique selon son ID.
  # Cette action permet de récupérer une réservation individuelle, 
  # utile pour consulter les détails d'une réservation spécifique.
  def show
    @booking = Booking.find_by(id: params[:id])
    
    # Vérifie si la réservation existe avant de la retourner
    if @booking
      render json: @booking, status: :ok
    else
      # Retourne une erreur si la réservation n'est pas trouvée
      render json: { error: "Réservation introuvable" }, status: :not_found
    end
  end

  # POST /bookings
  # Crée une nouvelle réservation avec les paramètres fournis.
  # Cette action est utilisée lorsqu'un client effectue une nouvelle réservation.
  def create
    @booking = Booking.new(booking_params)
    
    # Vérifie si la réservation est valide avant de l'enregistrer en base de données.
    if @booking.save
      # Retourne la réservation créée avec un statut HTTP 201 (Created).
      render json: @booking, status: :created
    else
      # Retourne les erreurs de validation si la sauvegarde échoue.
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  # PUT /bookings/:id
  # Met à jour une réservation existante avec les nouvelles informations fournies.
  # Cette action est utile lorsqu'un client ou un administrateur modifie une réservation (ex : changement d'horaire).
  def update
    @booking = Booking.find_by(id: params[:id])
    
    # Vérifie d'abord si la réservation existe avant d'essayer de la mettre à jour.
    if @booking
      if @booking.update(booking_params)
        # Retourne la réservation mise à jour avec un statut HTTP 200 (OK).
        render json: @booking, status: :ok
      else
        # Retourne les erreurs si la mise à jour échoue (ex : validation non respectée).
        render json: @booking.errors, status: :unprocessable_entity
      end
    else
      # Retourne une erreur si la réservation est introuvable.
      render json: { error: "Réservation introuvable" }, status: :not_found
    end
  end

  # DELETE /bookings/:id
  # Supprime une réservation si elle existe.
  # Cette action peut être utilisée lorsqu'un client annule une réservation ou lorsqu'un administrateur supprime une réservation obsolète.
  def destroy
    @booking = Booking.find_by(id: params[:id])
    
    # Vérifie d'abord si la réservation existe avant de tenter de la supprimer.
    if @booking
      @booking
