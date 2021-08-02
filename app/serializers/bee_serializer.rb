class BeeSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :user
  belongs_to :hive
end
