class Relationship < ApplicationRecord
    belongs_to :sender, class_name: "User"
    belongs_to :receiver, class_name: "User"

    has_many :chats, dependent: :destroy
    has_many :hives, through: :chats
end
