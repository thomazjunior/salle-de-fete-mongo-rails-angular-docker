ActiveSupport::Inflector.inflections do |inflect|
  # Irregular nouns related to Room Fest  
  inflect.irregular 'booking', 'bookings'
  inflect.irregular 'client', 'clients'
  inflect.irregular 'incident', 'incidents'
  inflect.irregular 'package', 'packages'
  inflect.irregular 'payment', 'payments'

  # Pluralization rules (forcing correct pluralization of domain-specific words)
  inflect.plural /^(room)$/i, '\1s'
  inflect.plural /^(guest)$/i, '\1s'
  inflect.singular /^(guests)$/i, 'guest'

  # Handling acronyms & abbreviations commonly used in the system
  inflect.acronym 'API' # Ensures API remains capitalized in class names
  inflect.acronym 'ID'  # Keeps ID capitalized when converting between cases
  inflect.acronym 'VAT' # Example for tax-related attributes
  
  # Uncountable words (they don’t have a plural form)
  inflect.uncountable %w( information data feedback )

  # Custom inflections for words that might cause issues in singular/plural transformations
  inflect.irregular 'status', 'statuses'  # Avoids "stati" or other incorrect forms
  inflect.irregular 'address', 'addresses'
  inflect.irregular 'company', 'companies'
  inflect.irregular 'analysis', 'analyses'  # Handles words with Greek/Latin pluralization
end
