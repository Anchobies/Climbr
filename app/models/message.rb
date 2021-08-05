class Message < ApplicationRecord
    belongs_to :chat

    validates :comment, presence: true
end
