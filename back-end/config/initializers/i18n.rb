# config/initializers/i18n.rb

# Specify available locales
I18n.available_locales = [:en, :fr] # Add others as needed

# Set the default locale to French
I18n.default_locale = :fr

# Add all locale files from config/locales to the load path
I18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.yml')]

# Enable fallbacks for missing translations
I18n.fallbacks[:en] = [:fr]  # English falls back to French
