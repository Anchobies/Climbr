class Problem < ApplicationRecord
    belongs_to :wall
    has_many :approaches, dependent: :destroy
    has_many :user_problems, dependent: :destroy
    has_many :solvers, through: :approaches, source: :users
    has_many :climbers, through: :user_problems, source: :users

    validates :name, presence: true
    validates :difficulty, presence: true
end
