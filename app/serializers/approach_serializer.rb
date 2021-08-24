class ApproachSerializer < ActiveModel::Serializer
  attributes :id, :steps, :user_id, :name

  belongs_to :problem
end
