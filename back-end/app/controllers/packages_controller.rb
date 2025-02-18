# Contrôleur pour gérer les forfaits (packages)
class PackagesController < ApplicationController
  # Inclure le concern pour utiliser les validations et méthodes communes
  include Packageable

  # Avant d'exécuter les actions show, update, destroy, définir l'instance de forfait
  before_action :set_package, only: [:show, :update, :destroy]

  # GET /packages
  # Récupère et affiche tous les forfaits disponibles
  def index
    @packages = Package.available
    render json: @packages, status: :ok
  end

  # GET /packages/:id
  # Affiche un forfait spécifique en fonction de l'ID
  def show
    render json: @package, status: :ok
  end

  # POST /packages
  # Crée un nouveau forfait avec les paramètres fournis
  def create
    @package = Package.new(package_params)
    if @package.save
      render json: @package, status: :created
    else
      render json: @package.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /packages/:id
  # Met à jour un forfait existant en fonction de l'ID
  def update
    if @package.update(package_params)
      render json: @package, status: :ok
    else
      render json: @package.errors, status: :unprocessable_entity
    end
  end

  # DELETE /packages/:id
  # Supprime un forfait en fonction de l'ID
  def destroy
    @package.destroy
    head :no_content
  end

  private

  # Définir le forfait en fonction de l'ID passé en paramètre
  def set_package
    @package = Package.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { erreur: "Forfait non trouvé" }, status: :not_found
  end

  # Définir les paramètres autorisés pour le forfait
  def package_params
    params.require(:package).permit(:name, :description, :price, features: [])
  end
end
