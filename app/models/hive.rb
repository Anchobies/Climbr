class Hive < ApplicationRecord
    has_many :bees, dependent: :destroy
    has_many :chats, dependent: :destroy
    has_many :users, through: :bees
    has_many :relationships, through: :chats
end
