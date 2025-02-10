class ClientsController < ApplicationController
  before_action :set_client, only: [:show, :update, :destroy]

  # GET /clients
  # Récupérer tous les clients
  def index
    @clients = Client.all
    render json: @clients
  end

  # GET /clients/:id
  # Récupérer un client par son ID
  def show
    @client = Client.find(params[:id])
    render json: @client
  rescue Mongoid::Errors::DocumentNotFound
    render json: { error: "Client not found" }, status: :not_found
  end

  # GET /clients/search?key=name&value=John
  # Rechercher des clients en fonction d'une clé et d'une valeur (ex: nom, email)
  def search
    key = params[:key]
    value = params[:value]
    @clients = Client.where("#{key} LIKE ?", "%#{value}%")
    render json: @clients
  end

  # POST /clients
  # Ajouter un client
  def create
    @client = Client.new(client_params)
    if @client.save
      render json: @client, status: :created
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  # POST /clients/bulk
  # Ajouter plusieurs clients en une seule requête
  def create_bulk
    @clients = Client.create!(clients_params[:clients])
    render json: @clients, status: :created
  end

  # PATCH/PUT /clients/:id
  # Modifier un client existant
  def update
    if @client.update(client_params)
      render json: @client
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  # DELETE /clients/:id
  # Supprimer un client par son ID
  def destroy
    @client.destroy
    head :no_content
  end

  # DELETE /clients/by_property?key=name&value=John
  # Supprimer tous les clients en fonction d'une propriété (ex: nom, email)
  def destroy_by_property
    key = params[:key]
    value = params[:value]
    Client.where("#{key} LIKE ?", "%#{value}%").destroy_all
    head :no_content
  end

  private

  # Trouver un client par ID
  def set_client
    @client = Client.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Client non trouvé" }, status: :not_found
  end

  # Définir les paramètres autorisés pour un client
  def client_params
    params.require(:client).permit(:name, :email, :phone, :address)
  end

  # Définir les paramètres pour une liste de clients
  def clients_params
    params.permit(clients: [:name, :email, :phone, :address])
  end
end
