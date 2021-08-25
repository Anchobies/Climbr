class WallSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :gym
end
