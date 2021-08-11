class User < ApplicationRecord
    has_many :approaches
    has_many :user_problems
    has_many :attempted_problems, through: :user_problems, source: :problems
    has_many :solved_problems, through: :approaches, source: :problems
    has_secure_password

    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
    validates :full_name, presence: true
    validates :username, presence: true, uniqueness: true
end
