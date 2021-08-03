class User < ApplicationRecord
    has_many :bees, dependent: :destroy
    has_many :hives, through: :bees
    has_many :senders, foreign_key: :sender_id, class_name: 'Relationship'
    has_many :receivers, through: :senders
    has_many :receivers, foreign_key: :receiver_id, class_name: 'Relationship'
    has_many :senders, through: :receivers
    has_secure_password
end