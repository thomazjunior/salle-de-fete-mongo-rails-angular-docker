class ClientsController < ApplicationController
  before_action :set_client, only: [:show, :update, :destroy]

  # GET /clients
  # Récupère et affiche tous les clients enregistrés dans la base de données.
  # Cette action est utile pour les administrateurs ou les systèmes de gestion client.
  def index
    @clients = Client.all
    render json: @clients
  end

  # GET /clients/:id
  # Récupère et affiche un client spécifique selon son ID.
  # Utile pour consulter les informations détaillées d'un client.
  def show
    render json: @client
  rescue Mongoid::Errors::DocumentNotFound
    # Gère le cas où le client demandé n'existe pas dans la base de données.
    render json: { error: "Client not found" }, status: :not_found
  end

  # GET /clients/search?key=name&value=John
  # Recherche les clients selon une propriété spécifique (ex : nom, email, téléphone).
  # Cette action est particulièrement utile pour des fonctionnalités de filtrage dynamique.
  def search
    key = params[:key]
    value = params[:value]

    # Vérifie si les paramètres de recherche sont fournis, sinon retourne une erreur.
    if key.blank? || value.blank?
      render json: { error: 'Key and value are required' }, status: :bad_request
      return
    end

    # Recherche les clients correspondant aux critères (recherche partielle).
    @clients = Client.where("#{key} LIKE ?", "%#{value}%")
    render json: @clients
  end

  # POST /clients
  # Crée un nouveau client avec les informations fournies.
  # Cette action est utilisée lorsqu'un client est ajouté manuellement ou via un formulaire.
  def create
    @client = Client.new(client_params)

    # Vérifie si le client est valide avant de l'enregistrer.
    if @client.save
      render json: @client, status: :created
    else
      # Retourne les erreurs de validation si la création échoue.
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  # POST /clients/bulk
  # Permet la création en masse de plusieurs clients en une seule requête.
  # Cette action est utile pour importer des clients à partir d'un fichier ou d'une intégration API.
  def create_bulk
    begin
      # Utilise `create!` pour lever une exception en cas d'erreur de validation.
      @clients = Client.create!(clients_params[:clients])
      render json: @clients, status: :created
    rescue ActiveRecord::RecordInvalid => e
      # Capture les erreurs et retourne un message clair.
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /clients/:id
  # Met à jour les informations d'un client existant.
  # Cette action est utile lorsqu'un client change son adresse, son téléphone ou son email.
  def update
    if @client.update(client_params)
      render json: @client
    else
      # Retourne les erreurs si la mise à jour échoue (ex : email déjà utilisé).
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  # DELETE /clients/:id
  # Supprime un client de la base de données.
  # Cette action est utilisée lorsqu'un compte client est fermé définitivement.
  def destroy
    @client.destroy
    head :no_content
  end

  # DELETE /clients/by_property?key=name&value=John
  # Supprime tous les clients correspondant à un critère donné.
  # Cette action est utile pour des suppressions en masse basées sur des filtres.
  def destroy_by_property
    key = params[:key]
    value = params[:value]

    # Vérifie que les paramètres sont fournis, sinon retourne une erreur.
    if key.blank? || value.blank?
      render json: { error: 'Key and value are required' }, status: :bad_request
      return
    end

    # Supprime tous les clients correspondant au critère fourni.
    Client.where("#{key} LIKE ?", "%#{value}%").destroy_all
    head :no_content
  end

  private

  # Recherche et assigne le client pour certaines actions (show, update, destroy).
  # Cela évite de répéter `Client.find` dans plusieurs méthodes.
  def set_client
    @client = Client.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    # Gère le cas où le client est introuvable et empêche une erreur fatale.
    render json: { error: "Client not found" }, status: :not_found
  end

  # Définit les paramètres autorisés pour éviter toute faille de sécurité.
  # Cela empêche un utilisateur de modifier des attributs
