class Problem < ApplicationRecord
    belongs_to :wall
    has_many :approaches, dependent: :destroy
    has_many :user_problems, dependent: :destroy
    has_many :solvers, through: :approaches, source: :user
    has_many :climbers, through: :user_problems, source: :user

    validates :name, presence: true
    validates :difficulty, presence: true
end
