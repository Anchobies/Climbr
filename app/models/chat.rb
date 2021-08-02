class Chat < ApplicationRecord
    belongs_to :relationship
    belongs_to :hive
    has_many :messages, dependent: :destroy
end
