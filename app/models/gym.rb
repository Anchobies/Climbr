class Gym < ApplicationRecord
    has_many :walls, dependent: :destroy

    validates :name, presence: true
end
