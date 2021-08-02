class ChatSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :relationship
  belongs_to :hive
end
