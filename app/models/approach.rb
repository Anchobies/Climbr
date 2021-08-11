class Approach < ApplicationRecord
    belongs_to :user
    belongs_to :problem

    validates :steps, presence: true
end
