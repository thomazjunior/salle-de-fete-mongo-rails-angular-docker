class PaymentsController < ApplicationController
  before_action :set_payment, only: [:show, :update, :destroy]

  # GET /payments
  def index
    @payments = Payment.all
    render json: @payments, status: :ok
  end

  # GET /payments/:id
  def show
    render json: @payment, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Payment not found" }, status: :not_found
  end

  # POST /payments
  def create
    @payment = Payment.new(payment_params)
    if @payment.save
      render json: @payment, status: :created
    else
      render json: @payment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /payments/:id
  def update
    if @payment.update(payment_params)
      render json: @payment, status: :ok
    else
      render json: @payment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /payments/:id
  def destroy
    @payment.destroy
    head :no_content
  end

  private

  # Set payment for actions
  def set_payment
    @payment = Payment.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Payment not found" }, status: :not_found
  end

  # Define permitted parameters for payment
  def payment_params
    params.require(:payment).permit(:amount, :payment_date, :payment_method, :status, :booking_id)
  end
end
