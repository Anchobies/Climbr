class Approach < ApplicationRecord
    belongs_to :user
    belongs_to :problem

    validates :steps, presence: true
    validates :name, presence: true, uniqueness: { scope: :user_id }
end
