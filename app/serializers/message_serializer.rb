class MessageSerializer < ActiveModel::Serializer
  attributes :id, :comment, :img_url, :created_at, :updated_at
end
