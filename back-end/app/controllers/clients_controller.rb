class ClientsController < ApplicationController
  before_action :set_client, only: [:show, :update, :destroy]

  # GET /clients
  def index
    @clients = Client.all
    render json: @clients
  end

  # GET /clients/:id
  def show
    render json: @client
  rescue Mongoid::Errors::DocumentNotFound
    render json: { error: "Client not found" }, status: :not_found
  end

  # GET /clients/search?key=name&value=John
  def search
    key = params[:key]
    value = params[:value]
    if key.blank? || value.blank?
      render json: { error: 'Key and value are required' }, status: :bad_request
      return
    end
    @clients = Client.where("#{key} LIKE ?", "%#{value}%")
    render json: @clients
  end

  # POST /clients
  def create
    @client = Client.new(client_params)
    if @client.save
      render json: @client, status: :created
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  # POST /clients/bulk
  def create_bulk
    begin
      @clients = Client.create!(clients_params[:clients])
      render json: @clients, status: :created
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /clients/:id
  def update
    if @client.update(client_params)
      render json: @client
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  # DELETE /clients/:id
  def destroy
    @client.destroy
    head :no_content
  end

  # DELETE /clients/by_property?key=name&value=John
  def destroy_by_property
    key = params[:key]
    value = params[:value]
    if key.blank? || value.blank?
      render json: { error: 'Key and value are required' }, status: :bad_request
      return
    end
    Client.where("#{key} LIKE ?", "%#{value}%").destroy_all
    head :no_content
  end

  private

  # Set client for actions
  def set_client
    @client = Client.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Client not found" }, status: :not_found
  end

  # Define permitted parameters for client
  def client_params
    params.require(:client).permit(:name, :email, :phone, :address, :phone_number)
  end

  # Define parameters for bulk client creation
  def clients_params
    params.permit(clients: [:name, :email, :phone, :address])
  end
end
