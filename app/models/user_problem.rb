class UserProblem < ApplicationRecord
    belongs_to :user
    belongs_to :problem

    validates :status, presence: true
end
