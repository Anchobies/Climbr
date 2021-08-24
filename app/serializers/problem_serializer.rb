class ProblemSerializer < ActiveModel::Serializer
  attributes :id, :name, :difficulty, :wall_id, :categories, :layout

  has_many :approaches
end
