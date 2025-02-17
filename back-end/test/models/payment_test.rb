require "test_helper"

class PaymentTest < ActiveSupport::TestCase
  # Set the locale to French for testing
  setup do
    I18n.locale = :fr
  end

  # Exécuté avant chaque test
  def setup
    @payment = Payment.new(
      amount: 200.0,
      payment_date: Date.today,
      payment_method: "credit_card",
      status: "completed",
      booking_id: "67ad05f67080710527819af5"
    )
  end

  # Teste la validité du paiement avec tous les attributs
  test "est valide avec tous les attributs" do
    assert @payment.valid?
  end

  # Teste la validation de présence du montant
  test "est invalide sans montant" do
    @payment.amount = nil
    assert_not @payment.valid?
    assert_includes @payment.errors[:amount], "can't be blank"
  end

  # Teste la validation de présence de la date de paiement
  test "est invalide sans date de paiement" do
    @payment.payment_date = nil
    assert_not @payment.valid?
    assert_includes @payment.errors[:payment_date], "can't be blank"
  end

  # Teste la validation de présence du mode de paiement
  test "est invalide sans méthode de paiement" do
    @payment.payment_method = nil
    assert_not @payment.valid?
    assert_includes @payment.errors[:payment_method], "can't be blank"
  end

  # Teste la validation de présence du statut
  test "est invalide sans statut" do
    @payment.status = nil
    assert_not @payment.valid?
    assert_includes @payment.errors[:status], "can't be blank"
  end

  # Teste une méthode personnalisée (exemple)
  test "calcule le montant total avec taxes" do
    # Supposant que vous avez une méthode comme : def total_with_tax
    assert_equal 220.0, @payment.total_with_tax(0.1)
  end
end
