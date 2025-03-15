# Contrôleur pour gérer les paiements
class PaymentsController < ApplicationController
  # Avant d'exécuter les actions show, update, et destroy, définir l'instance de paiement
  before_action :set_payment, only: [:show, :update, :destroy]

  # GET /payments
  # Récupère et retourne tous les paiements
  # ⚠️ Dans une application en production, il serait préférable de paginer les résultats
  def index
    @payments = Payment.all
    render json: @payments, status: :ok
  end

  # GET /payments/:id
  # Récupère un paiement spécifique en fonction de l'ID fourni
  def show
    render json: @payment, status: :ok
  end

  # POST /payments
  # Crée un nouveau paiement avec les paramètres fournis
  # ⚠️ Vérifier la validité du `booking_id` avant d'enregistrer le paiement pour éviter les erreurs d'intégrité
  def create
    @payment = Payment.new(payment_params)
    
    if @payment.save
      render json: @payment, status: :created
    else
      render json: { errors: @payment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /payments/:id
  # Met à jour un paiement existant avec les nouvelles données
  # ⚠️ Vérifier les règles métier : Un paiement peut-il être modifié une fois effectué ?
  def update
    if @payment.update(payment_params)
      render json: @payment, status: :ok
    else
      render json: { errors: @payment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /payments/:id
  # Supprime un paiement en fonction de l'ID fourni
  # ⚠️ Vérifier si la suppression d'un paiement est autorisée selon les règles métier
  def destroy
    @payment.destroy
    head :no_content
  end

  private

  # Récupère le paiement correspondant à l'ID passé en paramètre
  # Retourne une erreur si aucun paiement correspondant n'est trouvé
  def set_payment
    @payment = Payment.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Payment not found" }, status: :not_found
  end

  # Définir les paramètres autorisés pour un paiement
  # Assure que seul `amount`, `payment_date`, `payment_method`, `status`, et `
