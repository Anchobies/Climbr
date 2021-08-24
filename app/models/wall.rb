class Wall < ApplicationRecord
    belongs_to :gym
    has_many :problems, dependent: :destroy
end