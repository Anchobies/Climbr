class GymSerializer < ActiveModel::Serializer
  attributes :id, :name, :img_url

  has_many :walls
end
