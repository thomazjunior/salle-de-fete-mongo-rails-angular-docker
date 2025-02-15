require "test_helper"

class BookingTest < ActiveSupport::TestCase
  # Set the locale to French for testing
  setup do
    I18n.locale = :fr
  end
  
  # Exécuté avant chaque test
  def setup
    @reservation = Booking.new(
      date: Date.new(2025, 1, 12),
      start_time: "2025-01-12T10:00:00Z",
      end_time: "2025-01-12T14:00:00Z",
      number_of_guests: 50,
      status: 1,
      total_value: 700.0,
      client_id: "67ad05f67080710527819af5",
      package_id: "67ad0753e319528eecea5e27"
    )
  end

  # Teste la validité de la réservation avec tous les attributs
  test "est valide avec tous les attributs" do
    assert @reservation.valid?
  end

  # Teste la validation de présence de la date
  test "est invalide sans date" do
    @reservation.date = nil
    assert_not @reservation.valid?
    assert_includes @reservation.errors[:date], "can't be blank" #TODO: change environment to french localse
  end

  # Teste une méthode personnalisée
  test "calcule la durée en heures" do
    # Supposant que vous avez une méthode comme : def duration_in_hours
    assert_equal 4, @reservation.duration_in_hours
  end
end
