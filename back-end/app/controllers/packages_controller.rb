class PackagesController < ApplicationController
  def create
    @package = Package.new(package_params)
    if @package.save
      render json: @package, status: :created
    else
      render json: @package.errors, status: :unprocessable_entity
    end
  end

  private

  def package_params
    params.require(:package).permit(:name, :description, :price, features: [])
  end
end
