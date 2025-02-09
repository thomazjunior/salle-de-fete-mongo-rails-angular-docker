class Client
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :email, type: String
  field :phone_number, type: String
  field :company_name, type: String
  field :address, type: String
  field :preferred_contact_method, type: String
  field :status, type: String
end
