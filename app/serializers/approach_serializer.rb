class ApproachSerializer < ActiveModel::Serializer
  attributes :id, :steps

  belongs_to :problem
end
