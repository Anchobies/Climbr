class ApproachSerializer < ActiveModel::Serializer
  attributes :id, :steps, :user_id

  belongs_to :problem
end
