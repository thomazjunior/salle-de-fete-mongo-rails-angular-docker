require "test_helper"

class PackageTest < ActiveSupport::TestCase
  # Set the locale to French for testing
  setup do
    I18n.locale = :fr
  end

  # Exécuté avant chaque test
  def setup
    @package = Package.new(
      name: "Gold Package",
      description: "Package premium avec plusieurs avantages",
      price: 1000.0,
      features: ["Free Wifi", "Breakfast Included", "Spa Access"]
    )
  end

  # Teste la validité du package avec tous les attributs
  test "est valide avec tous les attributs" do
    assert @package.valid?
  end

  # Teste la validation de présence du nom
  test "est invalide sans nom" do
    @package.name = nil
    assert_not @package.valid?
    assert_includes @package.errors[:name], "can't be blank"
  end

  # Teste la validation de présence du prix
  test "est invalide sans prix" do
    @package.price = nil
    assert_not @package.valid?
    assert_includes @package.errors[:price], "can't be blank"
  end

  # Teste la validation du prix positif
  test "est invalide avec prix négatif" do
    @package.price = -100
    assert_not @package.valid?
    assert_includes @package.errors[:price], "must be greater than or equal to 0"
  end


end
